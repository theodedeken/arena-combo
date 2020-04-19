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
        this.tooltipBox = this.scene.add.rectangle(640, 400, 700, 50, 0x66ffffff);
        this.tooltipText = this.scene.add.text(290, 385, this.tooltip, {
            fontFamily: 'Arial',
            fixedWidth: 700,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });
        this.tooltipBox.setDepth(2);
        this.tooltipText.setDepth(2);
        this.text.text = pricing;
        this.text.y += 50;
        this.text.scaleX = 0.6;
        this.text.scaleY = 0.6;
        this.icon = this.scene.add.image(x, y, icon);
        this.icon.scale = 2;
    }

    handleMouseMove(cursor) {
        super.handleMouseMove(cursor);
        if (this.hoverState) {
            this.tooltipBox.visible = true;
            this.tooltipText.visible = true;
        } else {
            this.tooltipBox.visible = false;
            this.tooltipText.visible = false;
        }
    }

    hide() {
        this.icon.visible = false;
        this.tooltipText.visible = false;
        this.tooltipBox.visible = false;
        super.hide();
    }

    show() {
        super.show();
        this.tooltipText.visible = this.hoverState;
        this.tooltipBox.visible = this.hoverState;
        this.icon.visible = true;
    }

    setPricing(pricing) {
        this.pricing = pricing;
        this.text.text = pricing;
    }
}
