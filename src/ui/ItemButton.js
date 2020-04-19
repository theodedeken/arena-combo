import Button from './Button';

export default class ItemButton extends Button {
    constructor(x, y, width, height, icon, tooltip, pricing, callback, scene) {
        let but = scene.add.image(x, y, 'item_button');
        let hov = scene.add.image(x, y, 'item_button_hover');
        let dis = scene.add.image(x, y, 'item_button_disabled');
        
        let text = scene.add.text(x, y, 'Cost', {
            fontFamily: 'Arial',
            fixedWidth: width,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });
        text.originX = 0.5;
        text.originY = 0.5;
        
        super(x, y, width, height, but, hov, dis, text, callback, scene);
        
        this.pricing = pricing;
        this.tooltip = tooltip;
        this.text.text = pricing;
        this.text.y += 50;
        this.text.scaleX = 0.6;
        this.text.scaleY = 0.6;
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
