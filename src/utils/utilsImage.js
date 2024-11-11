import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const __dirname = path.dirname(__filename);

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public')); // Corrected path
    },
    filename: (req, file, cb) => {
      const imgpath = `${uuidv4()}${path.extname(file.originalname)}`;
      req.image = imgpath;
      cb(null, imgpath ); // Updated uuid syntax
    },
});

export const upload = multer({
storage,
fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        console.log('Only images are allowed');
        return cb(null, false);
    }
    cb(null, true);
}
});

