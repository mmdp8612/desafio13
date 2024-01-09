import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import { usersService } from "../services/UsersServices.js";

const documents = async (req, res) => {
    const { uid } = req.params;
    try{
        const user = await usersService.uploadDocuments(uid, req.files);
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully!'
        });
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const deleteDocument = async (req, res) => {
    const { uid, filename } = req.params;
    try{
        const deletedDocument = await usersService.deleteDocument(uid, filename);
        if(deletedDocument){
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const filePath = path.join(__dirname, '../uploads/documents', filename);
            await fs.access(filePath); 
            await fs.unlink(filePath);
            return res.status(200).json({
                success: true,
                message: 'File deleted successfully!'
            });
        }
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const profile = async (req, res) => {
    const { uid } = req.params;
    try{
        const user = await usersService.uploadProfile(uid, req.file);
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully!',
            filename: req.file.originalname    
        });
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const premium = async (req, res) => {
    const { uid } = req.params;
    try{
        const user = await usersService.premium(uid);
        if(user){
            return res.status(200).json({
                success: true,
                message: 'User converted to premium!'
            });
        }
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

export {
    documents,
    profile,
    premium,
    deleteDocument
}