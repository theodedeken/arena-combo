import Button from './Button';
import STATE from '../State';

export default class ItemButton extends Button {
    constructor(x, y, width, height, skin, hover, tooltip, pricing, key, callback, scene) {
        let but = scene.add.rectangle(x, y, width, height, 0x66666666);
        let hov = scene.add.rectangle(x, y, height, height, 0x66660000);
        let dis = scene.add.rectangle(x, y, height, height, 0x66333333);
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
        this.text.text = this.pricing(STATE.upgrades[key]);
        this.text.y += 40;
        this.text.scaleX = 0.6;
        this.text.scaleY = 0.6;
        this.key = key;
    }

    update() {
        this.text.text = this.pricing(STATE.upgrades[this.key]);
    }
}
