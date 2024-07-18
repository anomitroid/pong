// public/js/controller.js
class GameController {
    constructor(model, view, socket) {
        this.model = model;
        this.view = view;
        this.socket = socket;

        this.setupSocketListeners();
        this.setupInputListeners();
    }
  
    setupSocketListeners() {
        this.socket.on('gameStateFull', (gameState) => {
            this.model.updateGameState(gameState);
        });
    
        this.socket.on('gameStateDelta', (deltaState) => {
            this.model.updateDeltaState(deltaState);
        });
    }

    update() {
        const now = Date.now();
        const predictedState = this.model.predict(now);
        if (predictedState) {
            this.view.render(predictedState);
        }
        requestAnimationFrame(() => this.update());
    }
  
    setupInputListeners() {
        this.view.canvas.addEventListener('mousemove', (e) => this.handleInput(e.clientY));
        this.view.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.handleInput(touch.clientY);
        }, { passive: false });
    }
    
    handleInput(clientY) {
        const canvasRect = this.view.canvas.getBoundingClientRect();
        const y = clientY - canvasRect.top;
        const scaledY = (y / this.view.canvas.height) * 600; // Map to original 600px height
        this.socket.emit('paddleMove', scaledY - 50); // 50 is half the paddle height
    }
}
