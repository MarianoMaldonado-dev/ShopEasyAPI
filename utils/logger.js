import winston from 'winston';

const { combine, timestamp, printf, colorize, align } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        align(),
        logFormat
    ),
    transports: [
        // Guardar errores en un archivo
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // Guardar todos los logs en otro archivo
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Si no estamos en producción, también mostrar logs en la consola
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            align(),
            logFormat
        ),
    }));
}

export default logger;