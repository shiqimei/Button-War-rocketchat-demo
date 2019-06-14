import './assets/style.css';
import './assets/animations.css';
import './assets/loading.css';
import './reducers/windowMessage';

import './socket';
import Koji from 'koji-tools';
import './views/ReactLayer';
import reduxStore from './lib/createStore';
import * as AppActions from './actions/App';
import * as types from './actions/actionsTypes';
import {
	init as initRoomAction,
	player1TapRequest, player2TapRequest
} from './actions/room';

import Settings from './constants/settings';
import queryString from 'query-string';

import {
	requestAnimationFrame,
	cancelAnimationFrame
} from './helpers/animationframe.js';

import {
	loadList,
	loadImage,
	loadSound,
	loadFont
} from './helpers/loaders.js';

import Button from './characters/button.js';
import Background from './characters/background.js';
import Point from './characters/point.js';

class Game {

	constructor(canvas, overlay, topbar, config) {
		this.config = config; // customization
		this.overlay = overlay;
		this.topbar = topbar;

		this.canvas = canvas; // game screen
		this.ctx = canvas.getContext('2d'); // game screen context

		// frame count, rate, and time
		// this is just a place to keep track of frame rate (not set it)
		this.frame = {
			count: 0,
			time: Date.now(),
			rate: null,
			scale: null
		};

		// game settings
		this.state = {
			prev: '',
			paused: false,
			muted: localStorage.getItem('game-muted') === 'true'
		};

		this.input = {
			active: 'keyboard',
			keyboard: { up: false, right: false, left: false, down: false },
			tap: { x: 0, y: 0 }
		};

		this.images = {}; // place to keep images
		this.sounds = {}; // place to keep sounds
		this.fonts = {}; // place to keep fonts

		this.player = {};

		// setup event listeners
		// handle keyboard events
		document.addEventListener('keydown', ({ code }) => this.handleKeyboardInput('keydown', code));
		document.addEventListener('keyup', ({ code }) => this.handleKeyboardInput('keyup', code));

		// handle taps
		document.addEventListener('touchstart', ({ touches }) => this.handleTap(touches[0]));
		document.addEventListener('mousedown', (e) => this.handleTap(e));

		// handle overlay clicks
		this.overlay.root.addEventListener('click', (e) => this.handleClicks(e));

		// handle resize events
		window.addEventListener('resize', () => this.handleResize());
		window.addEventListener('orientationchange', (e) => this.handleResize(e));
        
		// handle koji config changes
		Koji.on('change', (scope, key, value) => {
			console.log('updating configs...', scope, key, value);
			this.config[scope][key] = value;
			this.cancelFrame(this.frame.count - 1);
			this.load();
		});
	}

	init() {
		// forward query strings
		const query = window.location.search;
		if (query) {
			const { rid } = queryString.parse(query);
			reduxStore.dispatch(initRoomAction(rid));
		}

		// subscribe
		reduxStore.subscribe(() => {
			const { lastAction } = reduxStore.getState();
			switch (lastAction.type) {
			case types.APP.COUNT_DOWN:
				this.countdown(this.countDownLength, this.goText, () => {
					reduxStore.dispatch(AppActions.startGameRequest());

					// if defaulting to have sound on by default
					// double mute() to warmup iphone audio here
					this.mute();
					this.mute();
				});
				break;
			case types.ROOM.PLAYER1_TAP_SUCCESS:
				this.playerScore(this.player1);
				break;
			case types.ROOM.PLAYER2_TAP_SUCCESS:
				this.playerScore(this.player2);
				break;
			default:
				console.log(lastAction);
			}
		});

		// set topbar and topbar color
		this.topbar.active = this.config.settings.gameTopBar;
		this.topbar.style.display = this.topbar.active ? 'block' : 'none';
		this.topbar.style.backgroundColor = this.config.colors.primaryColor;

		// set canvas
		// set game screen width
		this.canvas.width = window.innerWidth;
		// set game screen height
		this.canvas.height = this.topbar.active ? window.innerHeight - this.topbar.clientHeight : window.innerHeight;

		// set screen
		this.screen = {
			top: 0,
			bottom: this.canvas.height,
			left: 0,
			right: this.canvas.width,
			centerX: this.canvas.width / 2,
			centerY: this.canvas.height / 2,
			scale: ((this.canvas.width + this.canvas.height) / 2) * 0.003
		};

		// set number settings
		this.goText = this.config.settings.goText;
		this.winBy = parseInt(this.config.settings.winBy);
		this.countDownLength = parseInt(this.config.settings.countDown);

		// set document body to backgroundColor
		document.body.style.backgroundColor = this.config.colors.backgroundColor;

		// set loading indicator to textColor
		document.querySelector('#loading').style.color = this.config.colors.textColor;

	}

	load() {
		if(this.sounds.backgroundMusic) { this.sounds.backgroundMusic.pause(); }

		// load pictures, sounds, and fonts

		this.init(); // apply new configs
        
		// make a list of assets
		const gameAssets = [
			loadImage('playerOneImage', this.config.images.playerOneImage),
			loadImage('playerTwoImage', this.config.images.playerTwoImage),
			loadSound('backgroundMusic', this.config.sounds.backgroundMusic),
			loadSound('scoreSound', this.config.sounds.scoreSound),
			loadSound('winSound', this.config.sounds.winSound),
			loadFont('gameFont', this.config.settings.fontFamily)
		];

		// put the loaded assets the respective containers
		loadList(gameAssets)
			.then((assets) => {

				this.images = assets.image;
				this.sounds = assets.sound;

			})
			.then(() => this.create());
	}

	create() {
		// create game characters

		const { scale, centerY, right, left } = this.screen;
		const { playerOneImage, playerTwoImage } = this.images;
		const playerSize = parseInt(this.config.settings.playerSize);

		let playerHeight = playerSize * scale;
		let playerWidth = playerSize * scale;

		// player 1
		this.player1 = new Button({
			name: this.config.settings.playerOneName,
			ctx: this.ctx,
			image: playerOneImage,
			x: left,
			y: centerY - playerHeight / 2,
			width: playerWidth,
			height: playerHeight,
			bounds: this.screen,
			color: this.config.colors.playerOneColor
		});

		// player 2
		this.player2 = new Button({
			name: this.config.settings.playerTwoName,
			ctx: this.ctx,
			image: playerTwoImage,
			x: right - playerWidth,
			y: centerY - playerHeight / 2,
			width: playerWidth,
			height: playerHeight,
			bounds: this.screen,
			color: this.config.colors.playerTwoColor
		});

		// background
		this.background = new Background({
			ctx: this.ctx,
			x: this.screen.left,
			y: this.screen.top,
			width: this.screen.right,
			height: this.screen.bottom,
			pointA: this.player2,
			pointB: this.player1,
			win: this.winBy
		});

		this.points = [];

		// set overlay styles
		this.overlay.setStyles({...this.config.colors, ...this.config.settings});

		reduxStore.dispatch(AppActions.ready());
		this.play();
	}

	play() {
		const { App } = reduxStore.getState();

		// clear the screen of the last picture
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
 
		// draw background
		this.background.update({
			pointA: this.player2,
			pointB: this.player1
		});

		this.background.draw();

		// draw scores
		this.overlay.setScore1(this.player1.name, this.player1.score);
		this.overlay.setScore2(this.player2.name, this.player2.score);

		// ready to play
		if (App.current === 'ready') {
			this.overlay.hide('loading');
			this.canvas.style.opacity = 1;

			this.overlay.show('stats');

			this.overlay.setMute(this.state.muted);
			this.overlay.setPause(this.state.paused);

			// dev only
			// this.setState({ current: 'play' });
		}

		if (App.current === 'countdown') {
	
			// player bounce
			let dy = Math.cos(this.frame.count / 5);

			// bounce
			this.player1.move(0, dy, this.frame.scale);
			this.player2.move(0, dy, this.frame.scale);

			// this.player1.draw();
			// this.player2.draw();
		}

		// game play
		if (App.current === 'play') {
			// play music
			if (!this.state.muted) { this.sounds.backgroundMusic.play(); }

			// check for wins
			if (this.player1.score >= this.player2.score + this.winBy) {
				// player 1 wins
				this.wintime = Date.now();
				this.sounds.winSound.play();
				this.setState({ current: 'win-player1' });
			}

			if (this.player2.score >= this.player1.score + this.winBy) {
				// player 2 wins
				this.wintime = Date.now();
				this.sounds.winSound.play();
				this.setState({ current: 'win-player2' });
			}

			// player bounce
			let dy1 = 0;
			let dy2 = 0;
			if (!localStorage.getItem('count')) {
				localStorage.setItem('count', 0);
			}
			let count = localStorage.getItem('count');
			if (count % 7 === 0) {
				console.log(count);
				dy1 = Math.random(this.frame.count / 5) * 500 - 255;
				dy2 = Math.random(this.frame.count / 5) * 500 - 255;
			}
			localStorage.setItem('count', ++count);
			// bounce
			this.player1.move(0, dy1, this.frame.scale);
			this.player2.move(0, dy2, this.frame.scale);

			if (this.state.current !== 'win-player1' && this.state.current !== 'win-player2') {
				this.player1.draw();
				this.player2.draw();
			}
		}

		// player one wins
		if (this.state.current === 'win-player1') {
			this.overlay.setBanner(this.config.settings.playerOneWinText);
		}

		// player two wins
		if (this.state.current === 'win-player2') {
			this.overlay.setBanner(this.config.settings.playerTwoWinText);
		}

		// draw points
		this.points
			.forEach(p => p.draw());

		// remove points off screen
		this.points = [
			...this.points
				.filter(p => p.y > 0)
		];

		// draw the next screen
		this.requestFrame(() => this.play());
	}

	// player scores
	playerScore(player) {
		// increment score
		player.scorePoint(1);

		// get point x and y
		let pointX = player.x + player.width / 4;
		let pointY = player.y + player.height / 4;

		// get point size
		let fontSize = [window
			.getComputedStyle(this.overlay.banner, null)
			.getPropertyValue('font-size')]
			.map(val => val.replace('px', ''))
			.map(val => Math.round(val))
			.reduce(v => v);

		// add point
		this.points.push(
			new Point({
				ctx: this.ctx,
				text: '+1',
				x: pointX,
				y: pointY,
				font: this.fonts.gameFont,
				fontSize: fontSize,
				color: this.config.colors.textColor
			})
		);

		// play score sound
		this.sounds.scoreSound.currentTime = 0;
		this.sounds.scoreSound.play();
	}

	// event listeners
	handleClicks({ target }) {
		const { App } = reduxStore.getState();

		// ignore when loading or countdonw
		// if (['loading', 'countdown'].includes(App.current)) {
		// 	return;
		// }

		// reload when player has won
		if (App.current.includes('win') && Date.now() - this.wintime > 3000) {
			this.cancelFrame(this.frame.count - 1);
			this.load();
			return;
		}

		// mute
		if (target.id === 'mute') {
			this.mute();
		}

		// pause
		if (target.id === 'pause') {
			this.pause();
		}

		if ( target.id === 'button') {
			const { App } = reduxStore.getState();


			if (App.membersCount) {
				this.setState({ current: 'countdown' });
				this.countdown(this.countDownLength, this.goText, () => {
					this.setState({ current: 'play' });

					// if defaulting to have sound on by default
					// double mute() to warmup iphone audio here
					this.mute();
					this.mute();
				});
			}

		}
	}

	handleKeyboardInput(type, code) {
		const { App } = reduxStore.getState();

		// ignore when loading
		if (App.current === 'loading') {
			return;
		}

		this.input.active = 'keyboard';

		if (type === 'keyup') {
			if (code === 'ShiftRight') {
				if (App.current != 'play' || this.state.paused) { return; }

				// player 1 scores a point
				this.playerScore(this.player1);
			}

			if (code === 'ShiftLeft') {
				if (App.current != 'play' || this.state.paused) { return; }

				// player 1 scores a point
				this.playerScore(this.player2);
			}

			// spacebar start game
			if (code === 'Space') {
				// start game when read
				if (App.current === 'ready') {
					this.setState({ current: 'countdown' });
					this.countdown(this.countDownLength, this.goText, () => {
						this.setState({ current: 'play' });

						// if defaulting to have sound on by default
						// double mute() to warmup iphone audio here
						this.mute();
						this.mute();
					});
				}

				// reload when player has won
				if (App.current.includes('win')) {
					this.cancelFrame(this.frame.count - 1);
					this.load();
				}

				// pause when game state is play
				if (App.current === 'play') {
					this.pause();
				}
			}
		}
	}

	handleTap(touch) {
		const { App } = reduxStore.getState();

		if (App.current != 'play' || this.state.paused) { return; }
		let { clientX, clientY } = touch;

		console.log(clientX, clientY);

		// send tap to players
		let player1Score = this.player1.tap({ x: clientX, y: clientY });
		let player2Score = this.player2.tap({ x: clientX, y: clientY });

		if (player1Score) {
			// player 1 scores a point
			// this.playerScore(this.player1);
			reduxStore.dispatch(player1TapRequest());
		}

		if (player2Score) {
			// player 2 scores a point
			// this.playerScore(this.player2);
			reduxStore.dispatch(player2TapRequest());
		}
	}

	handleResize() {

		document.location.reload();
	}

	// game helpers
	// pause game
	pause() {
		const { App } = reduxStore.getState();

		if (App.current != 'play') { return; }

		this.state.paused = !this.state.paused;
		this.overlay.setPause(this.state.paused);

		if (this.state.paused) {
			// pause game loop
			this.cancelFrame(this.frame.count - 1);

			// mute all game sounds
			Object.keys(this.sounds).forEach((key) => {
				this.sounds[key].muted = true;
				this.sounds[key].pause();
			});

			this.overlay.setBanner('Paused');
		} else {
			// resume game loop
			this.requestFrame(() => this.play(), true);

			// resume game sounds if game not muted
			if (!this.state.muted) {
				Object.keys(this.sounds).forEach((key) => {
					this.sounds[key].muted = false;
					this.sounds.backgroundMusic.play();
				});
			}

			this.overlay.hide('banner');
		}
	}

	// mute game
	mute() {
		let key = 'game-muted';
		localStorage.setItem(
			key,
			localStorage.getItem(key) === 'true' ? 'false' : 'true'
		);
		this.state.muted = localStorage.getItem(key) === 'true';

		this.overlay.setMute(this.state.muted);

		if (this.state.muted) {
			// mute all game sounds
			Object.keys(this.sounds).forEach((key) => {
				this.sounds[key].muted = true;
				this.sounds[key].pause();
			});
		} else {
			// unmute all game sounds
			// and play background music
			// if game not paused
			if (!this.state.paused) {
				Object.keys(this.sounds).forEach((key) => {
					this.sounds[key].muted = false;
					this.sounds.backgroundMusic.play();
				});
			}
		}
	}

	countdown(n, goText, done) {

		let count = n;
		let cd = setInterval(() => {
			// done with countdown
			if (count < 0) {
				this.overlay.hide['countdown'];
				this.overlay.countdown.style.display = 'none';
				clearInterval(cd);
				done();
			}

			// display go text for 0 count
			let display = count < 1 ? goText : count;
			this.overlay.setCountDown(display);

			// only show positive counts
			if (count > 0) {
				this.overlay.countdown.style.display = 'block';
				this.overlay.show['countdown'];
			}
            
			count -= 1;
		}, 1000);
	}

	// reset game
	reset() {
		document.location.reload();
	}

	// update game state
	setState(state) {
		this.state = {
			...this.state,
			...state,
		};
	}

	// request new frame
	// wraps requestAnimationFrame.
	// see game/helpers/animationframe.js for more information
	requestFrame(next, resumed) {
		let now = Date.now();
		this.frame = {
			count: requestAnimationFrame(next),
			time: now,
			rate: resumed ? 0 : now - this.frame.time,
			scale: this.screen.scale * this.frame.rate * 0.01
		};
	}

	// cancel frame
	// wraps cancelAnimationFrame.
	// see game/helpers/animationframe.js for more information
	cancelFrame() {
		cancelAnimationFrame(this.frame.count);
	}
}

export default Game;