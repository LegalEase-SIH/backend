import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import PetitionModel from "../models/petition.model";
import { MulterError } from "multer";

const createPetition = async (req: Request, res: Response) => {
  try {
    console.log("after ");
    
    const file = req.file;

    const result = await cloudinary.uploader.upload(file!.path);

    console.log(result);

    let petition = new PetitionModel({
      url: result.secure_url,
      publicId: result.public_id,
      userId: req.params.userId,
    });

    await petition.save();

    res.status(200).json({
      message: "Uploaded the file successfully: " + req.file!.originalname,
      petitionId: petition._id,
      publicId: result.public_id
    });

  } catch (err) {
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

  } catch(err) {
    res.status(500).send({
      message: err
    })
  }
}

const getPetitionById = async (req: Request, res: Response) => {
  try {
    const petition = await PetitionModel.findById(req.params.petitionId)

    return res.status(200).send(petition)

  } catch(err) {
      res.status(500).send({
      message: err
    })
}
}

const calculateNer = async (req: Request, res: Response) => {

}

const handleSuccessRate = async (req: Request, res: Response) => {
  try {
    
  } catch(err) {

  }
}

export { createPetition, getAllPetitions, getPetitionById, calculateNer, handleSuccessRate };
