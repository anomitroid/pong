// controllers/GameController.js
const TICK_RATE = 120; // Increase to 120 FPS
class GameController {
    constructor(model, io) {
        this.model = model;
        this.io = io;
        this.gameLoop = null;
    }
  
    handleNewConnection(socket) {
        this.model.addPlayer(socket.id);
        socket.emit('gameState', this.model.getGameState());
    
        if (this.model.players.length === 2 && this.model.gameState === 'waiting') {
            this.startGame();
        }
    
        socket.on('paddleMove', (y) => {
            this.model.updatePlayerPosition(socket.id, y);
        });
    }
  
    handleDisconnect(socket) {
        this.model.removePlayer(socket.id);
        if (this.model.players.length < 2) {
            this.stopGame();
        }
    }
  
    startGame() {
        this.model.gameState = 'playing';
        this.lastUpdateTime = Date.now();
        this.gameLoop = setInterval(() => {
            const now = Date.now();
            const deltaTime = (now - this.lastUpdateTime) / 1000;
            this.lastUpdateTime = now;
        
            this.model.updateBall(deltaTime);
            this.sendGameState();
        }, 1000 / TICK_RATE);
    }

    sendGameState() {
        const fullState = this.model.getGameState();
        const deltaState = this.model.getDeltaState();
        this.io.emit('gameStateDelta', deltaState);

        // Send full state less frequently
        if (Math.random() < 0.1) { // 10% chance
            this.io.emit('gameStateFull', fullState);
        }
    }
  
    stopGame() {
        this.model.gameState = 'waiting';
        clearInterval(this.gameLoop);
        this.io.emit('gameState', this.model.getGameState());
    }
}
  
module.exports = GameController;