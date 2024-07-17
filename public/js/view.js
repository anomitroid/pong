// public/js/view.js
class GameView {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
  
    render(gameState) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Draw paddles
        gameState.players.forEach((player, index) => {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(
                index === 0 ? 10 : 780,
                player.y,
                10,
                100
            );
        });
    
        // Draw ball
        this.ctx.beginPath();
        this.ctx.arc(gameState.ball.x, gameState.ball.y, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = '#000';
        this.ctx.fill();
        this.ctx.closePath();
    
        // Draw scores
        this.ctx.font = '24px Arial';
        this.ctx.fillText(gameState.players[0].score, 100, 50);
        this.ctx.fillText(gameState.players[1].score, 700, 50);
    }
}