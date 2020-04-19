
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
        this.load.image('emperor', 'assets/sprites/emperor.svg');
        this.load.image('ui_corner', 'assets/sprites/corner_ui.svg');
        this.load.image('cooldown_border', 'assets/sprites/cooldown_border.svg');
        this.load.image('strength', 'assets/sprites/strength.svg');
        this.load.image('health', 'assets/sprites/health.svg');
        this.load.image('bounce', 'assets/sprites/bounciness.svg');
        this.load.image('oil', 'assets/sprites/oil.svg');
        this.load.image('spinner', 'assets/sprites/spinner.svg');
        // sounds
        this.load.audio('crowd', 'assets/sound/crowd_bg.ogg');
        this.load.audio('aargh', 'assets/sound/aargh.ogg');
        // hurts
        this.load.audio('hurt_1', 'assets/sound/hurt_1.ogg');
        this.load.audio('hurt_2', 'assets/sound/hurt_2.ogg');
        this.load.audio('hurt_3', 'assets/sound/hurt_3.ogg');
        this.load.audio('hurt_4', 'assets/sound/hurt_4.ogg');
        this.load.audio('hurt_5', 'assets/sound/hurt_5.ogg');
        this.load.audio('hurt_6', 'assets/sound/hurt_6.ogg');
        this.load.audio('hurt_7', 'assets/sound/hurt_7.ogg');
        this.load.audio('hurt_8', 'assets/sound/hurt_8.ogg');
        // hits
        this.load.audio('hit_wall_1', 'assets/sound/hit_wall_1.ogg');
        this.load.audio('hit_wall_2', 'assets/sound/hit_wall_2.ogg');
        this.load.audio('hit_wall_3', 'assets/sound/hit_wall_3.ogg');
        this.load.audio('hit_spike_1', 'assets/sound/hit_spike_1.ogg');
        this.load.audio('hit_spike_2', 'assets/sound/hit_spike_2.ogg');
        this.load.audio('hit_spike_3', 'assets/sound/hit_spike_3.ogg');
        // deaths
        this.load.audio('death_1', 'assets/sound/death_1.ogg');
        this.load.audio('death_2', 'assets/sound/death_2.ogg');
        this.load.audio('death_3', 'assets/sound/death_3.ogg');
        //music
        this.load.audio('shop_theme', 'assets/sound/main_theme.ogg');




        STATE.addtoArena(gladiatorGenerator, [this.sys.game.config.width / 2, 400]);
        STATE.addtoArena(gladiatorGenerator, [this.sys.game.config.width / 2 - 30, 445]);
        STATE.addtoArena(gladiatorGenerator, [this.sys.game.config.width / 2 + 30, 445]);
    }

    create() {
        this.add.rectangle(640, 400, 1180, 700, 0xeeeeee);
        let test = `
        Welcome to MY city!

        I am emperor Augustus Pompeius Maximus IV. 
        I like to hold games in MY honor.
        I grant these gladiators a glorious death in MY Combo arena.
        Keeping the combo alive for longer grants ME more gifts from MY audience.
        Which I can then use to throw even bigger games by upgrading the arena.
        To Kick off MY games I like to hurl the first gladiator into the arena from where I stand.
        It makes for an entertaining chain reaction if you aim it right.
        Some of these gladiators will die in the process but that is a sacrifice I am willing to make.
        `;
        this.explanation = this.add.text(0, 100, test, {
            fontFamily: 'Arial',
            fontSize: '20pt',
            fixedWidth: 1180,
            color: '#000000',
            align: 'center'
        });

        this.input.on('pointermove', this.handleMouseMove, this);
        this.input.on('pointerdown', this.handleMouseClick, this);

        this.emperor = this.add.image(640, 500, 'emperor');
        this.emperor.scale = 5;

        this.initButtons();
    }

    initButtons() {
        let upgx = 640;
        let upgy = 700;
        let upgw = 200;
        let upgh = 50;
        let but = this.add.image(upgx, upgy, 'button');
        let hov = this.add.image(upgx, upgy, 'button_hover');
        let text = this.add.text(upgx - upgw / 2, upgy - upgh / 4, 'Start the Games', {
            fontFamily: 'Arial',
            fixedWidth: 200,
            fontSize: '18pt',
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
