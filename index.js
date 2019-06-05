import Koji from 'koji-tools';
Koji.pageLoad();

// import Game and Overlay
import Game from './game/main.js';
import Overlay from './game/overlay.js';

const gameScreen = document.getElementById('gameScreen');
const gameOverlay = document.getElementById('gameOverlay');
const topbar = document.getElementById('topBar');

const config = Koji.config;
const overlay = new Overlay(gameOverlay);
const game = new Game(gameScreen, overlay, topbar, config);
game.load();