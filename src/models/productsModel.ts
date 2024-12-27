import mongoose, { Schema } from 'mongoose';
import { IReview, IProductFood, IProductAccesories, IProductPharma } from './productInterfaces';

const reviewSchema = new Schema<IReview>({
    userId: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
});

const commonFields = {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    lifeStage: { type: String, required: true },
    availability: { type: Boolean, default: true },
    quantity: { type: Number, required: true, min: 0 },
    reviews: [reviewSchema],
    discount: { type: Number, default: 0, min: 0, max: 100 },
    supplier_id: { type: String, required: true },
    storage_location: { type: String, required: true },
};

const foodSchema = new Schema<IProductFood>({
    ...commonFields,
    category: { type: String, default: 'food' },
    pet_type: { type: String, required: true },
    product_Type: { type: String, required: true },
});

const accessoriesSchema = new Schema({
    ...commonFields,
    category: { type: String, default: 'accessories' },
    pet_type: { type: String, required: true },
    accessory_Type: { type: String, required: true }
});


const pharmaSchema = new Schema({
    ...commonFields,
    category: { type: String, default: 'pharma' },
    pet_type: { type: String, required: true },
    dosage: { type: String, required: true },
    pharma_Type: { type: String, required: true },
    prescription_required: { type: Boolean, required: true }
});

export const FoodProduct = mongoose.model<IProductFood>('FoodProduct', foodSchema);
export const AccessoriesProduct = mongoose.model<IProductAccesories>('AccessoriesProduct', accessoriesSchema);
export const PharmaProduct = mongoose.model<IProductPharma>('PharmaProduct', pharmaSchema);