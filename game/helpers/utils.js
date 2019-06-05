/**
 * game/helpers/utils.js
 * 
 * What it Does:
 *   This file contains utilities for the game
 * 
 *   throttled: wraps a function so that it can't be called until the delay
 *   in milliseconds has gone by. useful for stopping unwanted side effects of button mashing.
 *   https://gph.is/1syA0yc
 * 
 *   bounded: apply a lower and upper bound to a number
 *   useful for add limits to AI character movements
 * 
 * What to Change:
 *   Add any new methods that don't fit anywhere else
 *   eg. 
 * 
 */


// sleep for milliseconds
const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

// create throttled function
// checkout: https://outline.com/nBajAS
const throttled = (delay, fn) => {
	let lastCall = 0;
	return function (...args) {
		const now = (new Date).getTime();
		if (now - lastCall < delay) {
			return;
		}
		lastCall = now;
		return fn(...args);
	};
};


// apply a lower and upper bound to n
const bounded = (n, min, max) => {
	return [n]
		.map(n => n < min ? min : n)
		.map(n => n > max ? max : n)
		.reduce(n => n);
};

// check if n is within bounds
const isBounded = (n, min, max) => {
	return n > min && n < max;
};

const hexToHSL = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let r = parseInt(result[1], 16);
	let g = parseInt(result[2], 16);
	let b = parseInt(result[3], 16);
	r /= 255, g /= 255, b /= 255;
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;
	if (max == min) {
		h = s = 0; // achromatic
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
		case r:
			h = (g - b) / d + (g < b ? 6 : 0);
			break;
		case g:
			h = (b - r) / d + 2;
			break;
		case b:
			h = (r - g) / d + 4;
			break;
		}
		h /= 6;
	}
	let HSL = new Object();
	HSL['h'] = h;
	HSL['s'] = s;
	HSL['l'] = l;
	return HSL;
};

const hexToRgbA = (hex, opacity) => {
	let h=hex.replace('#', '');
	h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

	for(let i=0; i<h.length; i++)
		h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);

	if (typeof opacity != 'undefined')  h.push(opacity);

	return 'rgba('+h.join(',')+')';
};

export {
	throttled,
	sleep,
	bounded,
	isBounded,
	hexToRgbA
};