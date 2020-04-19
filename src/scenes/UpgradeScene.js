import Button from '../ui/Button';
import PlaceableItemButton from '../ui/PlaceableItemButton';
import UpgradeableItemButton from '../ui/UpgradeableItemButton';
import STATE from '../State';

export default class UpgradeScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'UpgradeScene'
        });
    }
    preload() {

    }

    create() {
        this.input.on('pointermove', this.handleMouseMove, this);
        this.input.on('pointerdown', this.handleMouseClick, this);

        this.initButtons();
    }
    initButtons() {
        this.buttons = [];
        let upgx = 150;
        let upgy = 750;
        let upgw = 200;
        let upgh = 50;
        let but = this.add.rectangle(upgx, upgy, upgw, upgh, 0x666666);
        let hov = this.add.rectangle(upgx, upgy, upgw, upgh, 0x660000);
        let text = this.add.text(upgx - upgw / 2, upgy - upgh / 4, 'Arena', {
            fontFamily: 'Arial',
            fixedWidth: 200,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });

        this.mainBtn = new Button(upgx, upgy, upgw, upgh, but, hov, null, text, this.handleButton, this);
        this.buttons.push(this.mainBtn);

        this.upgrade1 = new UpgradeableItemButton(400, 200, 100, 100, null, null, 'test', 100, 10, () => console.log('upgrade 1'), this);
        this.upgrade2 = new UpgradeableItemButton(640, 200, 100, 100, null, null, 'test', 100, 10, () => console.log('upgrade 2'), this);
        this.upgrade3 = new UpgradeableItemButton(880, 200, 100, 100, null, null, 'test', 100, 10, () => console.log('upgrade 3'), this);
        this.buttons.push(this.upgrade1);
        this.buttons.push(this.upgrade2);
        this.buttons.push(this.upgrade3);

        this.place1 = new PlaceableItemButton(400, 500, 100, 100, null, null, 'test', 100, null, () => console.log('place 1'), this);
        this.place2 = new PlaceableItemButton(640, 500, 100, 100, null, null, 'test', 100, null, () => console.log('place 2'), this);
        this.place3 = new PlaceableItemButton(880, 500, 100, 100, null, null, 'test', 100, null, () => console.log('place 3'), this);
        this.buttons.push(this.place1);
        this.buttons.push(this.place2);
        this.buttons.push(this.place3);
    }

    handleButton() {
        if (STATE.state === 'upgrade') {
            STATE.setState('play');
            this.scene.scene.start('ArenaScene');
        } else if (STATE.state === 'upgrade') {
            STATE.setState('upgrade');
            this.text.text = 'Arena';
        } else {
            STATE.setState('upgrade');
            this.text.text = 'Arena';
        }
    }

    handleMouseClick(cursor) {
        this.buttons.forEach(btn => btn.handleMouseClick(cursor));
    }

    handleMouseMove(cursor) {
        this.buttons.forEach(btn => btn.handleMouseMove(cursor));
    }

    update() {

    }
}
