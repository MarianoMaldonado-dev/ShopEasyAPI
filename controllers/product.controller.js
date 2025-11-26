import Product from '../models/Product.js';
import logger from '../utils/logger.js';

// POST /api/products - Crear un nuevo producto
export const createProduct = async (req, res, next) => {
    const { title, description, price, image, category } = req.body;
    try {
        const product = new Product({
            title,
            description,
            price,
            image,
            category,
            owner: req.user.id, // El ID del usuario viene del middleware JWT
        });
        const createdProduct = await product.save();
        logger.info(`Producto creado: Se publicó "${createdProduct.title}" por UserID: ${req.user.id}`);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};

// GET /api/products - Listar todos los productos con paginación
export const getProducts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { search } = req.query;
    let query = {};

    if (search) {
        query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ]
        };
    }

    try {
        const products = await Product.find(query)
            .populate('owner', 'name')
            .skip(skip)
            .limit(limit);
        const total = await Product.countDocuments(query);
        res.json({
            products,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/products/:id - Obtener un producto por ID
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('owner', 'name email');
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado.' });
        }
    } catch (error) {
        next(error);
    }
};

// PUT /api/products/:id - Actualizar un producto
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        // Verificar si el usuario es el dueño o un admin
        if (product.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado para actualizar este producto.' });
        }

        const { title, description, price, image, category } = req.body;
        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;
        product.category = category || product.category;

        const updatedProduct = await product.save();
        logger.info(`Producto actualizado: Se actualizó la publicación " ${updatedProduct.title} " por UserID: ${req.user.id}`);
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/products/:id - Eliminar un producto
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        // Verificar si el usuario es el dueño o un admin
        if (product.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado para eliminar este producto.' });
        }

        await product.deleteOne();
        logger.info(`Producto eliminado: Se eliminó la publicación "${product.title}" por UserID: ${req.user.id}`);
        res.json({ message: 'Producto eliminado exitosamente.' });
    } catch (error) {
        next(error);
    }
};