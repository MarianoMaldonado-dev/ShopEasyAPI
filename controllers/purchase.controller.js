import Purchase from '../models/Purchase.js';
import Product from '../models/Product.js';
import logger from '../utils/logger.js';

// POST /api/purchases - Crear una nueva compra
export const createPurchase = async (req, res, next) => {
    const { cart, shippingAddress } = req.body; // cart: [{ productId, quantity }]
    const buyerId = req.user.id;

    try {
        let totalAmount = 0;
        const productsInPurchase = [];

        for (const item of cart) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Producto con ID ${item.productId} no encontrado.` });
            }
            totalAmount += product.price * item.quantity;
            productsInPurchase.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price, // Guardar precio actual
            });
        }

        const purchase = new Purchase({
            buyer: buyerId,
            products: productsInPurchase,
            totalAmount,
            shippingAddress,
        });

        const createdPurchase = await purchase.save();
        logger.info(`Nueva compra ${createdPurchase._id} realizada por ${buyerId}`);
        res.status(201).json(createdPurchase);
    } catch (error) {
        next(error);
    }
};

// GET /api/purchases - Listar compras con paginación  (admin) o propias (user)
export const getPurchases = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        // Si es admin ve todo, si es user ve únicamente las suyas
        const query = req.user.role === 'admin' ? {} : { buyer: req.user.id };

        const purchases = await Purchase.find(query)
            .populate('buyer', 'name email')
            .populate('products.product', 'title image')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Ordenar por más reciente

        const total = await Purchase.countDocuments(query);

        res.json({
            purchases,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/purchases/:id - Obtener una compra por ID
export const getPurchaseById = async (req, res, next) => {
    try {
        const purchase = await Purchase.findById(req.params.id)
            .populate('buyer', 'name email')
            .populate('products.product');

        if (!purchase) {
            return res.status(404).json({ message: 'Compra no encontrada.' });
        }

        // Verifica si el usuario es el comprador o un admin
        if (purchase.buyer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado para ver esta compra.' });
        }

        res.json(purchase);
    } catch (error) {
        next(error);
    }
};