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

const getPetition = (req: Request, res: Response) => {
  const fileName = req.params.name;
  const directoryPath = __dirname + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
}

export { createPetition };
