import Button from '../ui/Button';
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
        this.mainBtn.handleMouseClick(cursor);
    }

    handleMouseMove(cursor) {
        this.mainBtn.handleMouseMove(cursor);
    }

    update() {

    }
}
