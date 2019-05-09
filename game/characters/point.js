
/**
 * game/character/point.js
 * 
 * What it Does:
 *   This file is a basic button character
 * 
 * What to Change:
 *   Add any character specific methods
 *   eg. eat
 * 
 */

import { hexToRgbA } from '../helpers/utils.js';

class Point {
    constructor({ctx, text, x, y, font, color}) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.ox = x;
        this.oy = y;

        this.speed = Math.random() * 5 + 5;

        this.text = text;

        // this.color = hexToHSL(color);
        this.color = color;
        this.font = `bold 50px ${font}`
        this.alpha = 1;
    }
    
    draw() {
        this.y -= this.speed;
        this.alpha = this.y / this.oy

        this.ctx.font = this.font;
        this.ctx.fillStyle = hexToRgbA(this.color, this.alpha);
        this.ctx.fillText(this.text, this.x, this.y )
    }
}

export default Point;