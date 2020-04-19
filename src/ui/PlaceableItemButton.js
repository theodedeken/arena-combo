import ItemButton from './ItemButton';

export default class PlaceeableItemButton extends ItemButton {
    constructor(x, y, width, height, skin, hover, tooltip, cost, generator, callback, scene) {
        super(x, y, width, height, skin, hover, tooltip, cost, callback, scene);
        this.generator = generator;
        this.text.text = 'Place';
    }
}
