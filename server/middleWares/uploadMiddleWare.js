
import multer from 'multer';
import path from "path";
// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  },
});



export const upload = multer({ storage :storage});

