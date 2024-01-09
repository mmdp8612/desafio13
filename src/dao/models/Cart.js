import mongoose from 'mongoose';
import Product from '../models/Product.js';

const cartSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        required: true 
    },
    products: [
        { 
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product'
            },
            quantity: { 
                type: Number, 
                required: true 
            }
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;