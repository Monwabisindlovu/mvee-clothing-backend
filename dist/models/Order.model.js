import mongoose, { Schema } from 'mongoose';
const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    status: { type: String, default: 'pending' },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });
export default mongoose.model('Order', OrderSchema);
