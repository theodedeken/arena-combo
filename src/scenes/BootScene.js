
import Button from '../ui/Button';
import STATE from '../State';
import {
    gladiatorGenerator
} from '../placeables/Gladiator';

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        this.load.image('gladiator', 'assets/sprites/gladiator.svg');
        this.load.image('pointer', 'assets/sprites/arrow.svg');

        STATE.addtoArena(gladiatorGenerator, [this.sys.game.config.width / 2, 400, 16]);
        STATE.addtoArena(gladiatorGenerator, [this.sys.game.config.width / 2 - 20, 435, 16]);
        STATE.addtoArena(gladiatorGenerator, [this.sys.game.config.width / 2 + 20, 435, 16]);
    }

    create() {
        this.add.rectangle(640, 400, 1180, 700, 0xeeeeee);

        this.explanation = this.add.text(100, 100, 'Explaining the game\ntest', {
            fontFamily: 'Arial',
            fontSize: '20pt',
            color: '#000000',
            align: 'left'
        });

        this.input.on('pointermove', this.handleMouseMove, this);
        this.input.on('pointerdown', this.handleMouseClick, this);

        this.add.image(600, 400, 'gladiator');

        this.initButtons();
    }

    initButtons() {
        let upgx = 640;
        let upgy = 700;
        let upgw = 200;
        let upgh = 50;
        let but = this.add.rectangle(upgx, upgy, upgw, upgh, 0x666666);
        let hov = this.add.rectangle(upgx, upgy, upgw, upgh, 0x660000);
        let text = this.add.text(upgx - upgw / 2, upgy - upgh / 4, 'Start Game', {
            fontFamily: 'Arial',
            fixedWidth: 200,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });

        this.start = new Button(upgx, upgy, upgw, upgh, but, hov, null, text, () => { this.scene.start('ArenaScene'); STATE.setState('play'); }, this);
    }

    handleMouseClick(cursor) {
        if (cursor.button === 0) {
            this.start.handleMouseClick(cursor);
        }
    }

    handleMouseMove(cursor) {
        this.start.handleMouseMove(cursor);
    }

    update() {

    }
}

export default BootScene;
