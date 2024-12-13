// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Default level
    transports: [
        new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),  // Colorize the console output for easy reading
            winston.format.simple()     // Simple log format
        ),
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }), // Save to file
    ],
});

module.exports = logger;
