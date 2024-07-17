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
        document.addEventListener('mousemove', (e) => {
            const canvasRect = this.view.canvas.getBoundingClientRect();
            const mouseY = e.clientY - canvasRect.top;
            this.socket.emit('paddleMove', mouseY - 50); // 50 is half the paddle height
        });
    }
}