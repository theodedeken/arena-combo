import ItemButton from './ItemButton';

export default class PlaceableItemButton extends ItemButton {
    constructor(x, y, width, height, icon, tooltip, pricing, callback, scene) {
        super(x, y, width, height, icon, tooltip, pricing, callback, scene);
    }
}
