
import winston, { format } from 'winston'

const logger = winston.createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        format.colorize(),
        format.printf(({ level, message, label, timestamp }) => `${timestamp} ${label || '-'} ${level}: ${message}`),
    ),
    defaultMeta: { service: 'backend' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/app.log' }),
        new winston.transports.Stream({
            stream: process.stderr,
            level: 'debug',
        })
    ],
})

export default logger
