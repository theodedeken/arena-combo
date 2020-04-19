import ItemButton from './ItemButton';

export default class UpgradeableItemButton extends ItemButton {
    constructor(x, y, width, height, skin, hover, tooltip, pricing, maxlevel, key, callback, scene) {
        super(x, y, width, height, skin, hover, tooltip, pricing, key, callback, scene);
        this.maxlevel = maxlevel;

        let text = scene.add.text(x, y, 'Level', {
            fontFamily: 'Arial',
            fixedWidth: width,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });
        text.originX = 0.5;
        text.originY = 0.5;
        text.y += 40;
        text.scaleX = 0.6;
        text.scaleY = 0.6;
        this.levelText = text;
    }
}
