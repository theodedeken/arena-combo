import Button from '../ui/Button';
import PlaceableItemButton from '../ui/PlaceableItemButton';
import UpgradeableItemButton from '../ui/UpgradeableItemButton';
import STATE from '../State';
import {
    gladiatorGenerator
} from '../placeables/Gladiator';
import Placeable from '../placeables/Placeable';
import Arena from '../objects/Arena';
import {
    gladiatorpricing
} from '../functions';

export default class UpgradeScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'UpgradeScene'
        });
    }
    preload() {

    }

    create() {
        this.arena = new Arena(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 800, 500, 10, this, true);
        this.stands = this.add.ellipse(640, 400, 800 + 200, 500 + 200, 0xedddaf);
        this.emperor = this.add.rectangle(640, 400 - 800 / 2 + 100, 200, 75, 0x7056a3);
        this.ground = this.add.ellipse(640, 400, 800, 500, 0xab7f07);

        this.fillArena();

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

        this.mainBtn = new Button(upgx, upgy, upgw, upgh, but, hov, {}, text, this.handleButton, this);
        this.buttons.push(this.mainBtn);

        this.upgrade1 = new UpgradeableItemButton(400, 200, 100, 100, null, null, 'test', 100, 10, () => console.log('upgrade 1'), this);
        this.upgrade2 = new UpgradeableItemButton(640, 200, 100, 100, null, null, 'test', 100, 10, () => console.log('upgrade 2'), this);
        this.upgrade3 = new UpgradeableItemButton(880, 200, 100, 100, null, null, 'test', 100, 10, () => console.log('upgrade 3'), this);
        this.buttons.push(this.upgrade1);
        this.buttons.push(this.upgrade2);
        this.buttons.push(this.upgrade3);

        this.place1 = new PlaceableItemButton(400, 500, 100, 100, 'gladiator', null, 'test', gladiatorpricing, gladiatorGenerator, this.handlePlaceGladiator, this);
        this.place2 = new PlaceableItemButton(640, 500, 100, 100, null, null, 'test', 100, null, () => console.log('place 2'), this);
        this.place3 = new PlaceableItemButton(880, 500, 100, 100, null, null, 'test', 100, null, () => console.log('place 3'), this);
        this.buttons.push(this.place1);
        this.buttons.push(this.place2);
        this.buttons.push(this.place3);
    }

    handlePlaceGladiator(cursor) {
        this.scene.placing = new Placeable(cursor.x, cursor.y, this.generator, this.scene, this.scene.arena);
        STATE.setState('place');
        this.scene.mainBtn.text.text = 'Cancel';
        this.scene.upgrade1.hide();
        this.scene.upgrade2.hide();
        this.scene.upgrade3.hide();
        this.scene.place1.hide();
        this.scene.place2.hide();
        this.scene.place3.hide();
    }

    handleButton() {
        if (STATE.state === 'upgrade') {
            STATE.setState('play');
            this.scene.scene.start('ArenaScene');
        } else if (STATE.state === 'place') {
            STATE.setState('upgrade');
            this.text.text = 'Arena';
            this.scene.placing.destroy();
        } else {
            STATE.setState('upgrade');
            this.text.text = 'Arena';
        }
    }

    handleMouseClick(cursor) {
        if (STATE.state === 'place') {
            this.mainBtn.handleMouseClick(cursor);
            this.placing.handleMouseClick(cursor);
        } else {
            this.buttons.forEach(btn => btn.handleMouseClick(cursor));
        }
    }

    handleMouseMove(cursor) {
        if (STATE.state === 'place') {
            this.mainBtn.handleMouseMove(cursor);
            this.placing.handleMouseMove(cursor);
        } else {
            this.buttons.forEach(btn => btn.handleMouseMove(cursor));
        }
    }

    update() {

    }

    resetArena() {
        this.arena.reset();
        this.fillArena();
    }

    fillArena() {
        STATE.arenaState.forEach(el => {
            let added = this.arena.add(el[0], el[1]);
            added.initPlacing();
        });
    }
}
