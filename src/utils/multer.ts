import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from "path";

// Define the storage engine as memoryStorage
// const storage = multer.memoryStorage();


// Define the storage engine as diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // Get the current timestamp
    const fileExtension = path.extname(file.originalname); // Extract the file extension
    const filename = `${timestamp}${fileExtension}`; // Concatenate the timestamp and file extension
    cb(null, filename);
  },
});

// Define the file filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Configure multer with the defined storage and file filter
const uploadWithMulter = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default uploadWithMulter;
