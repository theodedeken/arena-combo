import Button from './Button';

export default class ItemButton extends Button {
    constructor(x, y, width, height, skin, hover, tooltip, cost, callback, scene) {
        let but = scene.add.rectangle(x, y, width, height, 0x66666666);
        let hov = scene.add.rectangle(x, y, height, height, 0x66660000);
        let text = scene.add.text(x - width / 2, y - height / 4, 'Cost', {
            fontFamily: 'Arial',
            fixedWidth: width,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });
        
        super(x, y, width, height, but, hov, null, text, callback, scene);
        
        this.cost = cost;
        this.tooltip = tooltip;
    }
}
