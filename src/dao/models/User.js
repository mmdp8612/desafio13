import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: [
            'user', 
            'admin',
            'premium'
        ],
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cart'
    },
    documents: [{
        name: {
            type: String,
            required: true,
            charset: 'utf8' 
        },
        reference: {
            type: String,
            required: true 
        }
    }],
    last_connection: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: false
    },
    github: {}
});

const User = mongoose.model('User', userSchema);

export default User;
