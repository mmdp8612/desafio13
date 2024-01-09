import path from 'path';
import bcrypt from 'bcrypt'
import User from "./models/User.js";

export class UserMongo {
    
    constructor(){

    }

    async login(email, password){
        try {
            if(email==="" || password === ""){
                throw new Error(`All fields are required`);
            }
            
            const userFound = await User.findOne({email});
            if(!userFound){
                throw new Error(`User ${email} Not Found!`);
            }

            if(!bcrypt.compareSync(password, userFound.password)){
                throw new Error(`Password incorrect!`);
            }
            
            await User.findOneAndUpdate(
                { email }, 
                { $set: { last_connection: new Date() } },
                { new: false } 
            );

            return userFound;
        } catch (error) {
            throw new Error(error);
        }
    }

    async register(first_name, last_name, email, age, password){

        try {
            if(first_name === "" || last_name === "" || email === "" || age === "" || password === ""){
                throw new Error(`All fields are required`);
            }
            
            const existsUser = await User.findOne({email});
            if(existsUser){
                throw new Error(`User ${email} duplicate!`);
            }

            const data = {
                first_name,
                last_name, 
                email, 
                age,
                password
            }
            
            data.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const user = new User(data);
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error);
        }   
    }

    async findUserById(id){
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updatePassword(email, newPassword){
        try {
            const user = await User.findOne({email});
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            const passwordMatch = await bcrypt.compare(newPassword, user.password);
            if (!passwordMatch) {
                throw new Error('La contraseña nueva debe ser diferente a la actual.');
            }

            const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
            user.password = hashedPassword;
            await user.save();
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }

    async uploadProfile(id, file){
        try {
            const user = await User.findOne({_id: id});
            if (!user) {
                throw new Error('User Not Found');
            }

            user.image = `${id}${path.extname(file.originalname)}`;
            await user.save();
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }

    async uploadDocuments(id, files){
        try {
            const user = await User.findOne({_id: id});
            if (!user) {
                throw new Error('User Not Found');
            }
            
            const newDocuments = files.map(file => ({
                name: file.originalname,
                reference: file.filename,
            }));
        
            if(user.documents.length !== 0){
                user.documents = user.documents.concat(newDocuments);
            }else{
                user.documents = newDocuments;
            }

            await user.save();
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }

    async premium(id){
        try {
            const user = await User.findOne({_id: id});
            if (!user) {
                throw new Error('User Not Found');
            }

            const requiredDocuments = ['Identificacion', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];

            const uploadedDocuments = user.documents.map(doc => {
                const nameWithoutExtension = doc.name.split('.').slice(0, -1).join('.');
                return nameWithoutExtension;
            });

            const hasDocs = requiredDocuments.every(doc => uploadedDocuments.includes(doc));

            if(!hasDocs){
                throw new Error('The user does not have the required documents');
            }

            user.role = "premium";
            await user.save();
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteDocument(id, filename){
        try {
            const user = await User.findOne({_id: id});
            if (!user) {
                throw new Error('User Not Found');
            }
            
            await User.findOneAndUpdate(
                { _id: id },
                { $pull: { documents: { reference: filename } } },
                { new: true }
            );
            
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}