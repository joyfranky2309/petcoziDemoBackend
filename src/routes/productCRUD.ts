import express, { Request, Response } from 'express';
import { Model } from 'mongoose';
import { FoodProduct, AccessoriesProduct, PharmaProduct } from '../models/productsModel';
import { IProductFood, IProductAccesories, IProductPharma } from '../models/Interfaces/productInterfaces';

const router = express.Router();

type ProductType = 'food' | 'accessories' | 'pharma';

function getProductModel(type: ProductType): Model<IProductFood | IProductAccesories | IProductPharma> | null {
    switch (type) {
        case 'food':
            return FoodProduct as Model<IProductFood>;
        case 'accessories':
            return AccessoriesProduct as Model<IProductAccesories>;
        case 'pharma':
            return PharmaProduct as Model<IProductPharma>;
        default:
            return null;
    }
}

async function handleModelOperation<T>(
    res: Response,
    operation: (model: Model<T>) => Promise<T | null>,
    model: Model<T> | null
): Promise<T | null> {
    if (!model) {
        res.status(400).json({ message: 'Invalid product type' });
        return null;
    }

    try {
        const result = await operation(model);
        return result;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
        return null;
    }
}

// Create a new product
router.post('/:type', async (req: Request, res: Response) => {
    const model = getProductModel(req.params.type as ProductType);
    const result = await handleModelOperation(res, async (m) => {
        const newProduct = new m(req.body);
        return newProduct.save();
    }, model);
    if (result) res.status(201).json(result);
});

// Get all products
router.get('/:type', async (req: Request, res: Response) => {
    const model = getProductModel(req.params.type as ProductType);
    const result = await handleModelOperation(res, (m) => m.find().exec(), model);
    if (result) res.json(result);
});

// Get a product by ID
router.get('/:type/:id', async (req: Request, res: Response): Promise<void> => {
    const model = getProductModel(req.params.type as ProductType);
    const result = await handleModelOperation(res, (m) => m.findById(req.params.id).exec(), model);
    if (!result) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.json(result);
});

// Update a product by ID
router.put('/:type/:id', async (req: Request, res: Response): Promise<void> => {
    const model = getProductModel(req.params.type as ProductType);
    const result = await handleModelOperation(res, (m) =>
        m.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec(),
        model
    );
    if (!result) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.json(result);
});

// Delete a product by ID
router.delete('/:type/:id', async (req: Request, res: Response): Promise<void> => {
    const model = getProductModel(req.params.type as ProductType);
    const result = await handleModelOperation(res, (m) =>
        m.findByIdAndDelete(req.params.id).exec(),
        model
    );
    if (!result) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.json({ message: 'Product deleted successfully' });
});

export default router;