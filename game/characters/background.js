
/**
 * game/character/background.js
 * 
 * What it Does:
 *   This file is a basic button character
 * 
 * What to Change:
 *   Add any character specific methods
 *   eg. eat
 * 
 */

import { bounded, isBounded } from '../helpers/utils.js';

class Background {
    constructor({ctx, x, y, width, height, pointA, pointB, win}) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.a = {
            x: pointA.cx,
            y: pointA.cy,
            score: pointA.score,
            color: pointA.color
        };

        this.b = {
            x: pointB.x,
            y: pointB.y,
            score: pointB.score,
            color: pointB.color
        };

        this.win = win;
        this.gradient = this.ctx.createLinearGradient(this.a.x, this.a.y, this.b.x, this.b.y);
    }
    
    update({ pointA, pointB }) {
        // update pointA
        this.a = {
            x: pointA.cx,
            y: pointA.cy,
            score: pointA.score,
            color: pointA.color
        };

        // update pointB
        this.b = {
            x: pointB.cx,
            y: pointB.cy,
            score: pointB.score,
            color: pointB.color
        };

        let points = this.getMidPoints();

        // update gradient
        this.gradient = this.ctx.createLinearGradient(this.a.x, this.a.y, this.b.x, this.b.y);

        this.gradient.addColorStop(0, this.a.color);
        this.gradient.addColorStop(points.left, this.a.color);
        this.gradient.addColorStop(points.right, this.b.color);
        this.gradient.addColorStop(1, this.b.color);

    }

    draw() {
        let scoreDiff = this.a.score - this.b.score;
        let stillOn = isBounded(scoreDiff, -this.win, this.win);

        if (stillOn) {
            // draw gradient

            this.ctx.fillStyle = this.gradient;
        } else {
            // give winner the whole screen

            scoreDiff > 0 ?
            this.ctx.fillStyle = this.a.color :
            this.ctx.fillStyle = this.b.color;
        }

        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    getMidPoints() {
        // midpoint by score
        return [this.a.score - this.b.score]
        .map(n => n + this.win)
        .map(n => n / (this.win * 2))
        .map(n => {
            // 0.4 and 0.6 when players are tied
            return {
                left: bounded(n - 0.01, 0, 1),
                right: bounded(n + 0.01, 0, 1)
            }
        })
        .reduce(m => m);
    }
}

export default Background;