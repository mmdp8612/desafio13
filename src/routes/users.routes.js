import { fileURLToPath } from "url";
import path, { dirname } from 'path';
import multer from 'multer';
import fs from 'fs';
import { Router } from "express";

import {
    documents,
    profile, 
    premium,
    deleteDocument
} from "../controllers/users.controller.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storageDestination = (folderPath) => {
    return (req, file, cb) => {
      const uploadPath = path.join(__dirname, folderPath);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    };
};

const storageProfile = multer.diskStorage({
    destination: storageDestination('../uploads/profiles'),
    filename: (req, file, cb) => {
        cb(null, `${req.params.uid}${path.extname(file.originalname)}`);
    },
});
  
const storageDocuments = multer.diskStorage({
    destination: storageDestination('../uploads/documents'),
    filename: (req, file, cb) => {
        cb(null, `${req.params.uid}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const uploadProfile = multer({ storage: storageProfile });
const uploadDocuments = multer({ storage: storageDocuments });

router.post('/:uid/documents', uploadDocuments.array('documents'), documents);
router.post('/:uid/profile', uploadProfile.single('image'), profile);
router.post('/premium/:uid', premium);
router.delete('/:uid/documents/:filename', deleteDocument);

export default router;