import Button from './Button';

export default class Checkbox extends Button {
    constructor(x, y, width, height, skin, check, checked, callback, scene) {
        let but = scene.add.image(x, y, skin);
        let hov = scene.add.image(x, y, check);
        let dis = scene.add.image(x, y, check);

        if (checked) {
            super(x, y, width, height, hov, but, dis, {}, callback, scene);
        } else {
            super(x, y, width, height, but, hov, dis, {}, callback, scene);
        }

        this.uncheck = but;
        this.check = hov;
        this.checked = checked;
    }

    handleMouseMove(cursor) {
        if (this.enabled && this.visible) {
            if (this.collides(cursor)) {
                if (!this.hoverState) {
                    this.hoverState = true;
                    this.hover.visible = true;
                    this.skin.visible = false
                }
            } else if (this.hoverState) {
                this.hoverState = false;
                this.hover.visible = false;
                this.skin.visible = true;
            }
        }
    }

    flip() {
        this.checked = !this.checked;
        if (this.checked) {
            this.hover = this.uncheck
            this.skin = this.check
        } else {
            this.hover = this.check
            this.skin = this.uncheck
        }
    }
}
