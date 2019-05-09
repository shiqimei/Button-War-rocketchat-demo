/**
 * game/character/button.js
 * 
 * What it Does:
 *   This file is a basic button character
 * 
 * What to Change:
 *   Add any character specific methods
 *   eg. eat
 * 
 */

import { isBounded } from '../helpers/utils.js';
import ImageSprite from '../objects/imageSprite.js';

class Button extends ImageSprite {
    constructor(options) {
        super(options);

        this.color = options.color;
        this.score = 0;
    }

    scorePoint(n) {
        this.score += n;
    }

    tap({ x, y }) {
        return this.inBox(x, y);
    }
    
    inBox(x, y) {
        // check x and y against box
        const inX = isBounded(x, this.box.left, this.box.right);
        const inY = isBounded(y, this.box.top, this.box.bottom);

        return inX && inY;
    }
}

export default Button;