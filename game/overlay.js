class Overlay {
	constructor(node) {
		this.root = node;

		this.container = node.querySelector('.container');

		this.loading = node.querySelector('#loading');
		this.banner = node.querySelector('#banner');
		this.button = node.querySelector('#button');
		this.instructions = node.querySelector('#instructions');
		this.countdown = node.querySelector('#countdown');

		this.score1 = node.querySelector('#score1');
		this.score2 = node.querySelector('#score2');

		this.mute = node.querySelector('#mute');
		this.pause = node.querySelector('#pause');

		this.styles = {};
	}

	setBanner(message) {
		this.banner.textContent = message;
		this.show('banner');
	}

	setButton(message) {
		// fix for safari
		this.button.innerHTML = `<span id="buttonspan">${message}</span>`;
		this.show('button');
	}

	setInstructions({ desktop, mobile }) {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			// show mobile instructions

			this.instructions.innerHTML = mobile;
		} else {
			// show desktop instructions

			this.instructions.innerHTML = desktop;
		}
		this.show('instructions');
	}

	setScore1(name, score) {
		this.score1.textContent = `${name}: ${score}`;
		this.show('score1');
	}

	setScore2(name, score) {
		this.score2.textContent = `${name}: ${score}`;
		this.show('score2');
	}

	setMute(muted) {
		this.mute.textContent = muted ? 'volume_off' : 'volume_up';
		this.show('mute');
	}

	setPause(paused) {
		this.pause.textContent = paused ? 'play_arrow' : 'pause';
		this.show('pause');
	}

	setCountDown(n) {
		this.countdown.textContent = n;
		this.show('countdown');
	}

	show(keys) {
		if (Array.isArray(keys)) {
			keys.forEach(key => this.show(key));
		} else {
			let node = this[keys];
			if (node) {
				node.active = true;
				node.style.visibility = 'visible';
				node.style.opacity = 1;
			}
		}
	}

	hide(keys) {
		if (Array.isArray(keys)) {
			keys.forEach(key => this.hide(key));
		} else {
			let node = this[keys];
			if (node && (node.active || node.active === undefined)) {
				this[keys].active = false;
				this[keys].style.opacity = 0;
				this[keys].style.visibility = 'hidden';
			}

		}
	}

	setStyles(styles) {
		this.styles = { ...this.styles, ...styles };
		this.applyStyles();
	}

	applyStyles() {
		this.container.style.color = this.styles.textColor;
		this.container.style.fontFamily = this.styles.fontFamily;
		this.button.style.backgroundColor = this.styles.primaryColor;
	}
}

export default Overlay;