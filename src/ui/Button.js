export default class Button {
    constructor(x, y, width, height, skin, hover, disabled, text, callback) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.skin = skin;
        this.hover = hover;
        this.disabled = disabled;
        this.text = text;
        this.hoverState = false;
        this.hover.visible = this.hoverState;
        this.enabled = true;
        this.callback = callback;
    }

    disable() {
        this.enabled = false;
        this.disabled.visible = true;
    }

    enable() {
        this.enabled = true;
        this.disabled.visible = false;
    }

    collides(cursor) {
        let lx = this.x - this.width / 2;
        let ly = this.y - this.height / 2;
        let rx = this.x + this.width / 2;
        let ry = this.y + this.height / 2;
        return (cursor.x > lx && cursor.x < rx) && (cursor.y > ly && cursor.y < ry);
    }

    handleMouseMove(cursor) {
        if (this.enabled) {
            if (this.collides(cursor)) {
                if (!this.hoverState) {
                    this.hoverState = true;
                    this.hover.visible = true;
                }
            } else if (this.hoverState) {
                this.hoverState = false;
                this.hover.visible = false;
            }
        }
    }

    handleMouseClick(cursor) {
        if (this.enabled) {
            if (this.collides(cursor)) {
                this.callback();
            }
        }
    }
}
