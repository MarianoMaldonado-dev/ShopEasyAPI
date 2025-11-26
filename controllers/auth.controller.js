import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        // Determinar rol basado en el email
        const role = email.endsWith('@admin.com') ? 'admin' : 'user';

        const user = await User.create({ name, email, password, role });

        const token = generateToken(user._id, user.role);
        
        logger.info(`Usuario registrado: ${user.email}`);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            const token = generateToken(user._id, user.role);
            logger.info(`Inicio de sesión exitoso: ${user.email}`);
            res.json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        } else {
            logger.warn(`Intento de inicio de sesión fallido para Email: ${email} - IP: ${req.ip}`);
            return res.status(401).json({ message: 'Email o contraseña inválidos.' });
        }
    } catch (error) {
        next(error);
    }
};