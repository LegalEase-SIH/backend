import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import PetitionModel from "../models/petition.model";
import { MulterError } from "multer";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase.config";
import axios from "axios";


initializeApp(firebaseConfig);

const storage = getStorage();

const createPetition = async (req: Request, res: Response) => {
  try {
    console.log("after ");


    if (!req.file) {
      return res.status(500).send("Something went wrong")
    }

    const storageRef = ref(storage, `resources/${req.file.originalname}}`);

    const metadata = {
      contentType: req.file.mimetype,
    }

    console.log("HERE");
    

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

    res.status(200).json({
      message: "Uploaded the file successfully: " + req.file!.originalname,
      petitionId: petition._id,
      url: petition.url,
    });

  } catch (err) {
    console.log("SOME ERROR");
    
    if (err instanceof MulterError) {
      return res.status(500).send({
        message: err.message,
      });
    }
    else {
      res.status(500).send({
        message: `Could not upload the file: ${err}`
      });
    }
  }
}

const getAllPetitions = async (req: Request, res: Response) => {
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

}

const handleSuccessRate = async (req: Request, res: Response) => {
  try {
    const petitionId = req.params.id;

    // Database call
    const petition = await PetitionModel.findOne({ _id: petitionId});

    if (petition === null || petition === undefined) {
      return res.status(404).send({
        message: "Petition not found"
      })
    }

    const result = await axios.post("https://bart-sr-model-ingress-cj8815hg2gg97uokhutg.apps.mumbai1.eks.zone.napptive.dev/petitionSuccessProb",  {
      petitionId: petitionId,
      url: petition.url  
    })

    petition.set({
      
    })

    return res.status(200).send({
      successRate: result.data.successRate
    })


  } catch (err) {
    return res.status(500).send({
      message: err
    })
  }
}

export { createPetition, getAllPetitions, getPetitionById, calculateNer, handleSuccessRate };
