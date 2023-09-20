import { readableStreamToJSON } from "bun";
import { Request, Response } from "express";
import uploadFileMiddleware from "../middlewares/multer";
import { MulterError } from "multer";

const createPetition = async (req: Request, res: Response) => {
  try {
    // await uploadFileMiddleware(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    if (err instanceof MulterError) {
      return res.status(500).send({
        message: err.message,
      });
    }
    else {
      res.status(500).send({
        message: `Could not upload the file: ${err}`,
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
