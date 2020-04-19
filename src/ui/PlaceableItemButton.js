import ItemButton from './ItemButton';

export default class PlaceableItemButton extends ItemButton {
    constructor(x, y, width, height, icon, hover, tooltip, pricing, generator, key, callback, scene) {
        super(x, y, width, height, icon, hover, tooltip, pricing, key, callback, scene);
        this.generator = generator;
        this.icon = this.scene.add.image(x, y, icon);
        this.icon.scale = 2;
    }

    hide() {
        this.icon.visible = false;
        super.hide();
    }

    show() {
        super.show();
        this.icon.visible = true;
    }
}
