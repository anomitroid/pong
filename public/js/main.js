// public/js/main.js
const socket = io();
const canvas = document.getElementById('pongCanvas');
const model = new GameModel();
const view = new GameView(canvas);
const controller = new GameController(model, view, socket);

controller.update(); // Start the animation loop