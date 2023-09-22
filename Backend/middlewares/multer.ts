import multer from "multer";

const maxSize = 10*1024*1024; // 2MB

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log(process.cwd());
//         cb(null,  "./resources");
//     },
//     filename: (req, file, cb) => {
//         console.log(file.originalname);
//         cb(null, file.originalname);
//     },
// });

let storage = multer.memoryStorage();

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file")

export default uploadFile;
