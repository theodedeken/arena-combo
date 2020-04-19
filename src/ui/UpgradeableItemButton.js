import ItemButton from './ItemButton';

export default class UpgradeableItemButton extends ItemButton {
    constructor(x, y, width, height, skin, hover, tooltip, cost, maxlevel, callback, scene) {
        super(x, y, width, height, skin, hover, tooltip, cost, callback, scene);
        this.maxlevel = maxlevel;
    }
}
