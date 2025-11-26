import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const registerRules = () => [
    body('name', 'El nombre es obligatorio').notEmpty().trim(),
    body('email', 'Por favor, incluye un email válido').isEmail().normalizeEmail(),
    body('password', 'La contraseña debe tener 6 o más caracteres').isLength({ min: 6 }),
];

export const loginRules = () => [
    body('email', 'Por favor, incluye un email válido').isEmail().normalizeEmail(),
    body('password', 'La contraseña es obligatoria').notEmpty(),
];

export const productRules = () => [
    body('title', 'El título es obligatorio').notEmpty().trim(),
    body('description', 'La descripción es obligatoria').notEmpty().trim(),
    body('price', 'El precio debe ser un número positivo').isFloat({ gt: 0 }),
    body('image', 'La URL de la imagen es obligatoria').isURL(),
    body('category', 'La categoría es obligatoria').notEmpty().trim(),
];

export const purchaseRules = () => [
    body('shippingAddress', 'La dirección de envío es obligatoria').notEmpty().trim(),
    body('cart', 'El carrito no puede estar vacío').isArray({ min: 1 }),
    body('cart.*.productId', 'ID de producto inválido en el carrito').isMongoId(),
    body('cart.*.quantity', 'La cantidad debe ser al menos 1').isInt({ gt: 0 }),
];