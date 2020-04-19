export default class UICorner {
    constructor(scene, gold) {
        this.scene = scene;
        this.scene.add.image(1155, 700, 'ui_corner');
       
        this.bar = this.scene.add.rectangle(1045, 712, 220, 40, 0x3ca3b5);
        this.bar.setOrigin(0, 0.5);
        this.scene.add.image(1155, 712, 'cooldown_border');
        let coin = this.scene.add.image(1245, 765, 'coin');
        coin.scaleX = 0.7;
        coin.scaleY = 0.7;

        this.combo = scene.add.text(1160, 630, '0x', {
            fontFamily: 'Arial',
            fixedWidth: 100,
            fontSize: '25pt',
            color: '#000000',
            align: 'center'
        });

        this.gold = scene.add.text(1050, 750, gold, {
            fontFamily: 'Arial',
            fontSize: '20pt',
            color: '#000000'
        });
    }

    setGold(gold) {
        this.gold.text = gold;
    }

    setCombo(combo) {
        this.combo.text = combo + 'x';
        if (combo > 9999) {
            this.combo.scaleX = 0.5;
            this.combo.scaleY = 0.5;
        } else {
            this.combo.scaleX = 1;
            this.combo.scaleY = 1;
        }
    }

    setCooldown(cooldown) {
        this.bar.scaleX = cooldown;
    }
}
