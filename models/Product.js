import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria.'],
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio.'],
        min: [0, 'El precio no puede ser negativo.'],
    },
    image: {
        type: String,
        required: [true, 'La URL de la imagen es obligatoria.'],
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;