
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

        this.load.image('coin', 'assets/sprites/coin.svg');
        this.load.image('item_button', 'assets/sprites/item_button.svg');
        this.load.image('item_button_hover', 'assets/sprites/item_button_hover.svg');
        this.load.image('item_button_disabled', 'assets/sprites/item_button_disabled.svg');

        this.load.image('button', 'assets/sprites/button.svg');
        this.load.image('button_hover', 'assets/sprites/button_hover.svg');

        this.load.image('arena', 'assets/sprites/arena.svg');
        this.load.image('background', 'assets/sprites/background.svg');
        this.load.image('ui_corner', 'assets/sprites/corner_ui.svg');
        this.load.image('cooldown_border', 'assets/sprites/cooldown_border.svg');

        // sounds
        this.load.audio('crowd', 'assets/sound/crowd_bg.ogg');

        STATE.addtoArena(gladiatorGenerator, [this.sys.game.config.width / 2, 400]);
        STATE.addtoArena(gladiatorGenerator, [this.sys.game.config.width / 2 - 30, 445]);
        STATE.addtoArena(gladiatorGenerator, [this.sys.game.config.width / 2 + 30, 445]);
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
        let but = this.add.image(upgx, upgy, 'button');
        let hov = this.add.image(upgx, upgy, 'button_hover');
        let text = this.add.text(upgx - upgw / 2, upgy - upgh / 4, 'Start Game', {
            fontFamily: 'Arial',
            fixedWidth: 200,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });

        this.start = new Button(upgx, upgy, upgw, upgh, but, hov, {}, text, () => { this.scene.start('ArenaScene'); STATE.setState('play'); }, this);
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
