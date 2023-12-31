import { Request, Response } from "express";
import PetitionModel from "../models/petition.model";
import { MulterError } from "multer";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import axios from "axios";

const baseUrl = "http://d645-35-204-1-76.ngrok-free.app"

const createPetition = async (req: Request, res: Response) => {
  try {
    console.log("after ");
    const storage = getStorage();

    if (!req.file) {
      return res.status(500).send("Something went wrong")
    }

    const storageRef = ref(storage, `resources/${req.file.originalname}}`);

    const metadata = {
      contentType: req.file.mimetype,
    }

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

    // const result = await cloudinary.uploader.upload(file!.path, {
    //   format: "pdf",
    //   folder: "uploads",
    //   resource_type: "raw"
    // });

    const downloadUrl = await getDownloadURL(snapshot.ref);

    console.log(downloadUrl);

    let petition = new PetitionModel({
      url: downloadUrl,
      userId: req.params.userId,
    });

    await petition.save();

    return res.status(200).json({
      message: "Uploaded the file successfully: " + req.file!.originalname,
      petitionId: petition._id,
      url: petition.url,
    });

  } catch (err) {
    console.log("SOME ERROR");
    console.log(err);


    if (err instanceof MulterError) {
      return res.status(500).send({
        message: err.message,
      });
    }
    else {
      return res.status(500).send({
        message: `Could not upload the file: ${err}`
      });
    }
  }
}

const getAllPetitions = async (req: Request, res: Response) => {
  console.log("Inslide get all petitions");

  try {
    const petition = await PetitionModel.find({ userId: req.params.userId })

    res.status(200).send(petition)
  } catch (err) {
    res.status(500).send({
      message: err
    })

  }
}

const getPetitionById = async (req: Request, res: Response) => {
  try {
    const petition = await PetitionModel.findById(req.params.petitionId)
    return res.status(200).send(petition)
  } catch (err) {
    res.status(500).send({
      message: err
    })
  }
}

const calculateNer = async (req: Request, res: Response) => {
  try {
    const petitionId = req.params.id;

    // Database call
    const petition = await PetitionModel.findOne({ _id: petitionId });

    if (petition === null || petition === undefined) {
      return res.status(404).send({
        message: "Petition not found"
      })
    }

    const result = await axios.post(baseUrl + "/ml/ner", {
      url: petition.url
    })

    const list = result.data;
    console.log(list);


    list.forEach((item: any) => {
      const key = Object.keys(item)[0]
      const val = item[key]

      petition.ner.set(key, val)
    })

    await petition.save();

    return res.status(200).json({
      petition: petition,
      cached: false
    })

  } catch (err) {
    return res.status(500).send({
      message: err
    })
  }
}

const search = async (req: Request, res: Response) => {
  const query = req.query.query;
  try {
    const result = await axios.post(baseUrl + "/ml/chat/search", {
      query: query
    })

    console.log(result.data);


    return res.status(200).json({
      result: result.data
    })
  } catch (err) {
    console.log(err);

    return res.status(500).send({
      message: err
    })
  }
}

const handleSuccessRate = async (req: Request, res: Response) => {
  console.log("Inside handle successRate")
  try {
    const petitionId = req.params.id;

    // Database call
    const petition = await PetitionModel.findOne({ _id: petitionId });

    if (petition === null || petition === undefined) {
      return res.status(404).send({
        message: "Petition not found"
      })
    }

    if (petition.successRate !== 0) {
      return res.status(200).json({
        petition: petition,
        cached: true
      })
    }

    const result = await axios.post("https://bart-sr-model-ingress-cj8815hg2gg97uokhutg.apps.mumbai1.eks.zone.napptive.dev/petitionSuccessProb", {
      petitionId: petitionId,
      url: petition.url
    })

    petition.successRate = result.data.prediction_prob;

    await petition.save();

    return res.status(200).json({
      petition: petition,
      cached: false
    })

  } catch (err) {
    return res.status(500).send({
      message: err
    })
  }
}

export { createPetition, getAllPetitions, getPetitionById, calculateNer, handleSuccessRate, search };
