import Button from './Button';

export default class Checkbox extends Button {
    constructor(x, y, width, height, skin, hover, check, disabled, text, callback) {
        super(x, y, width, height, skin, hover, disabled, text, callback);
        this.check = check;
        this.checked = false;
        this.check.visible = this.checked;
    }

    handleMouseClick(cursor) {
        if (this.collides(cursor)) {
            this.callback();
            this.check.visible = !this.checked;
            this.checked = !this.checked;
        }
    }
}
