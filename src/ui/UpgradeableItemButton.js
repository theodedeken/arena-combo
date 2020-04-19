import ItemButton from './ItemButton';

export default class UpgradeableItemButton extends ItemButton {
    constructor(x, y, width, height, icon, tooltip, pricing, maxlevel, callback, scene) {
        super(x, y, width, height, icon, tooltip, pricing, callback, scene);
        this.maxlevel = maxlevel;

        let text = scene.add.text(x - width / 2, y - 60, 'Level', {
            fontFamily: 'Arial',
            fixedWidth: width,
            fontSize: '12pt',
            color: '#000000',
            align: 'center'
        });
        this.levelText = text;
    }

    hide() {
        this.levelText.visible = false;
        super.hide();
    }

    show() {
        super.show();
        this.levelText.visible = true;
    }
}
