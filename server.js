// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const GameModel = require('./models/GameModel');
const GameController = require('./controllers/GameController');

app.use(express.static('public'));

const gameModel = new GameModel();
const gameController = new GameController(gameModel, io);

io.on('connection', (socket) => {
    console.log('New client connected');
    gameController.handleNewConnection(socket);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        gameController.handleDisconnect(socket);
    });
});

const PORT = process.env.PORT || 42030;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));