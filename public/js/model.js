// public/js/model.js
class GameModel {
    constructor() {
        this.gameState = null;
        this.lastUpdateTime = Date.now();
    }
  
    updateGameState(newState) {
        this.gameState = newState;
        this.lastUpdateTime = Date.now();
    }
  
    updateDeltaState(deltaState) {
        if (!this.gameState) return;
    
        this.gameState.ball.x = deltaState.b[0];
        this.gameState.ball.y = deltaState.b[1];
        deltaState.p.forEach((p, i) => {
            this.gameState.players[i].y = p[0];
            this.gameState.players[i].score = p[1];
        });
        this.lastUpdateTime = Date.now();
    }
  
    predict(now) {
        if (!this.gameState) return null;
    
        const deltaTime = (now - this.lastUpdateTime) / 1000;
        const predictedState = JSON.parse(JSON.stringify(this.gameState));
    
        predictedState.ball.x += predictedState.ball.dx * deltaTime * 60;
        predictedState.ball.y += predictedState.ball.dy * deltaTime * 60;
    
        return predictedState;
    }
}