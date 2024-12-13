const app = require('./App')
const http = require('http');
const socketIo = require('socket.io');
const logger = require('./src/logger.js')  // Import the logger

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    logger.info('New client connected');  // Log when a client connects

    socket.on('message', (data) => {
        logger.info(`Message received from client: ${data}`); // Log message data
        io.emit('message', data);  // Emit the message to all clients
    });

    socket.on('disconnect', () => {
        logger.info('Client disconnected');  // Log when a client disconnects
    });
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.devHOST;

server.listen(PORT, HOST, () => {
    logger.info(`Server is listening at http://${HOST}:${PORT}`);  // Log when the server starts
});
