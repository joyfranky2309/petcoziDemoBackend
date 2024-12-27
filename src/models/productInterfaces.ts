import { Document } from 'mongoose';
const productCategories = ['food', 'accessories', 'pharma'] as const;
type ProductCategory = typeof productCategories[number];

interface IReview {
    userId: string;
    comment: string;
    rating: number;
    createdAt: Date;
}

interface ICommonProduct extends Document {
    category: ProductCategory;
    name: string;
    description: string;
    brand: string;
    price: number;
    lifeStage: string;
    availability: boolean;
    quantity: number;
    reviews: IReview[];
    discount: number;
    supplier_id: string;
    storage_location: string;
}

interface IProductFood extends ICommonProduct {
    pet_type: string;
    product_Type: string;
}

interface IProductAccesories extends ICommonProduct {
    pet_type: string;
    accessory_Type: string;
}

interface IProductPharma extends ICommonProduct {
    pet_type: string;
    pharma_Type: string;
    prescription_required: boolean;
    dosage: string;
}
export { IProductFood, IProductAccesories, IProductPharma,IReview};