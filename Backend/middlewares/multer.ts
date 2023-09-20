import util from "util";
import multer from "multer";

const maxSize = 10*1024*1024; // 2MB

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
export default uploadFileMiddleware;