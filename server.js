import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from './utils/logger.js';
import swaggerUi from 'swagger-ui-express';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';
import userRoutes from './routes/user.routes.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// =======================================================
// SWAGGER CONFIGURATION (Documentación)
// =======================================================
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'API de ShopEasy',
        version: '1.0.0',
        description: 'Documentación de la API para la aplicación ShopEasy.',
    },
    servers: [{ url: '/api', description: 'Ruta principal de la API' }],
    paths: {
        '/auth/register': { post: { summary: 'Registro de nuevo usuario' } },
        '/auth/login': { post: { summary: 'Inicio de sesión y obtención de JWT' } },
        '/auth/profile': { put: { summary: 'Actualizar datos de perfil (Protegida)' } },
        '/products': { get: { summary: 'Listar productos con paginación y búsqueda' }, post: { summary: 'Crear nuevo producto (Protegida)' } },
        '/products/{id}': { get: { summary: 'Obtener producto por ID' }, put: { summary: 'Actualizar producto (Dueño/Admin)' }, delete: { summary: 'Eliminar producto (Dueño/Admin)' } },
        '/users': { get: { summary: 'Listar usuarios (Solo Admin)' } },
        '/users/{id}': { delete: { summary: 'Eliminar usuario (Solo Admin)' } },
        '/purchases': { post: { summary: 'Crear nueva compra (Protegida)' }, get: { summary: 'Listar compras (Propias/Admin)' } },
    },
};
// =======================================================


// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL, // Permitir solo solicitudes desde el frontend
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/users', userRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('La API de ShopEasy está funcionando correctamente!');
});

// Manejo de errores centralizado
app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500).json({
        message: err.message || 'Ha ocurrido un error en el servidor.'
    });
});

// Conexión a la base de datos y arranque del servidor
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('Conectado a la base de datos de Atlas. Nombre de DB: "test" ');
        app.listen(PORT, () => {
            logger.info(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        logger.error('Error al conectar con "test" MongoDB:', err);
        process.exit(1);
    });