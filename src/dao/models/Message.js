import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    fechahora: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
