const app = require('./App')
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (data) => {
        console.log('Message received from client:', data)
        io.emit('message', data);  // Changed from socket.broadcast.emit to io.emit
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.devHOST;

server.listen(PORT, HOST, () => {
    console.log(`Listening: http://${HOST}:${PORT}`);
});

