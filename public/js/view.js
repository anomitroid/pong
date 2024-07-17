// public/js/view.js
class GameView {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.aspectRatio = 4 / 3; // Maintaining 800x600 aspect ratio
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const containerRatio = containerWidth / containerHeight;

        if (containerRatio > this.aspectRatio) {
            this.canvas.height = containerHeight;
            this.canvas.width = containerHeight * this.aspectRatio;
        } else {
            this.canvas.width = containerWidth;
            this.canvas.height = containerWidth / this.aspectRatio;
        }
        this.scale = this.canvas.width / 800; // 800 is the original game width
    }

    render(gameState) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.scale(this.scale, this.scale);

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

        this.ctx.restore();
    }
}
