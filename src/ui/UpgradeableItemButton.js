import ItemButton from './ItemButton';

export default class UpgradeableItemButton extends ItemButton {
    constructor(x, y, width, height, skin, hover, tooltip, pricing, maxlevel, key, callback, scene) {
        super(x, y, width, height, skin, hover, tooltip, pricing, key, callback, scene);
        this.maxlevel = maxlevel;
    }
}
