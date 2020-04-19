export default class Button {
    constructor(x, y, width, height, skin, hover, disabled, text, callback, scene) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.skin = skin;
        this.hover = hover;
        this.disabled = disabled;
        this.disabled.visible = false;
        this.text = text;
        this.hoverState = false;
        this.hover.visible = this.hoverState;
        this.enabled = true;
        this.callback = callback;
        this.scene = scene;
        this.visible = true;
    }

    hide() {
        this.visible = false;
        this.hover.visible = false;
        this.skin.visible = false;
        this.disabled.visible = false;
        this.text.visible = false;
    }

    show() {
        this.visible = true;
        this.hover.visible = this.hoverState;
        this.skin.visible = true;
        this.disabled.visible = !this.enabled;
        this.text.visible = true;
    }

    disable() {
        this.enabled = false;
        this.hover.visible = false;
        this.hoverState = false;
        this.skin.visible = false;
        this.disabled.visible = true;
    }

    enable() {
        this.enabled = true;
        this.hover.visible = true;
        this.skin.visible = true;
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
        if (this.enabled && this.visible) {
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
        if (this.enabled && this.visible) {
            if (this.collides(cursor)) {
                this.callback(cursor);
            }
        }
    }
}
