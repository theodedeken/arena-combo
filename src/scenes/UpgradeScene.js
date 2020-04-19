import Button from '../ui/Button';
import PlaceableItemButton from '../ui/PlaceableItemButton';
import UpgradeableItemButton from '../ui/UpgradeableItemButton';
import ItemButton from '../ui/ItemButton';
import STATE from '../State';
import {
    gladiatorGenerator
} from '../placeables/Gladiator';
import Placeable from '../placeables/Placeable';
import Arena from '../objects/Arena';
import {
    gladiatorpricing, multiplierpricing
} from '../functions';

import UICorner from '../objects/UICorner';

export default class UpgradeScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'UpgradeScene'
        });
    }
    preload() {

    }

    create() {
        this.arena = new Arena(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 640, 400, 10, this, true);

        this.fillArena();

        this.input.on('pointermove', this.handleMouseMove, this);
        this.input.on('pointerdown', this.handleMouseClick, this);

        this.uicorner = new UICorner(this, STATE.gold);

        this.initButtons();
    }
    initButtons() {
        this.buttons = [];
        let upgx = 125;
        let upgy = 750;
        let upgw = 200;
        let upgh = 50;
        let but = this.add.image(upgx, upgy, 'button');
        let hov = this.add.image(upgx, upgy, 'button_hover');
        let text = this.add.text(upgx - upgw / 2, upgy - upgh / 4, 'Arena', {
            fontFamily: 'Arial',
            fixedWidth: 200,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });

        this.mainBtn = new Button(upgx, upgy, upgw, upgh, but, hov, {}, text, this.handleButton, this);
        this.buttons.push(this.mainBtn);

        this.gladiatorCost = gladiatorpricing(STATE.upgrades.gladiator);
        this.placeGladiator = new ItemButton(400, 500, 128, 128, 'gladiator', 'Place a new gladiator in the arena', this.gladiatorCost, this.handlePlaceGladiator, this);
        this.buttons.push(this.placeGladiator);

        this.multiplierCost = multiplierpricing(STATE.upgrades.strength);
        this.upgradeMult = new UpgradeableItemButton(400, 300, 128, 128, 'strength', 'Doubles the Combo multiplier', this.multiplierCost, 10, this.handleUpgradeMult, this);
        this.buttons.push(this.upgradeMult);

        /*
        this.upgrade2 = new UpgradeableItemButton(640, 200, 100, 100, null, null, 'test', gladiatorpricing, 10, 'bounce', () => console.log('upgrade 2'), this);
        this.upgrade3 = new UpgradeableItemButton(880, 200, 100, 100, null, null, 'test', gladiatorpricing, 10, 'health', () => console.log('upgrade 3'), this);
        this.buttons.push(this.upgrade2);
        this.buttons.push(this.upgrade3);

        this.place2 = new PlaceableItemButton(640, 500, 100, 100, null, null, 'test', gladiatorpricing, null, 'oil', () => console.log('place 2'), this);
        this.place3 = new PlaceableItemButton(880, 500, 100, 100, null, null, 'test', gladiatorpricing, null, 'pillar', () => console.log('place 3'), this);
        this.buttons.push(this.place2);
        this.buttons.push(this.place3); */

        this.updateButtons();
    }

    updateButtons() {
        if (STATE.state === 'upgrade') {
            this.gladiatorCost = gladiatorpricing(STATE.upgrades.gladiator);
            if (this.gladiatorCost > STATE.gold) {
                this.placeGladiator.disable();
            }
            this.placeGladiator.text.text = this.gladiatorCost;

            this.multiplierCost = multiplierpricing(STATE.upgrades.strength);
            if (STATE.upgrades.strength === this.upgradeMult.maxlevel || this.multiplierCost > STATE.gold) {
                this.upgradeMult.disable()
            }
            if (STATE.upgrades.strength === this.upgradeMult.maxlevel) {
                this.upgradeMult.levelText.text = 'MAX';
            }
            else {
                this.upgradeMult.levelText.text = 'Level ' + STATE.upgrades.strength;
            }
            this.upgradeMult.text.text = this.multiplierCost

            this.mainBtn.text.text = 'Arena';
            this.upgradeMult.show();
            // this.scene.upgrade2.show();
            // this.scene.upgrade3.show();
            this.placeGladiator.show();
            // this.scene.place2.show();
            // this.scene.place3.show();
        } else {
            this.mainBtn.text.text = 'Cancel';
            this.upgradeMult.hide();
            // this.scene.upgrade2.hide();
            // this.scene.upgrade3.hide();
            this.placeGladiator.hide();
            // this.scene.place2.hide();
            // this.scene.place3.hide();
        }
    }

    handlePlaceGladiator(cursor) {
        this.scene.placing = new Placeable(cursor.x, cursor.y, gladiatorGenerator, this.scene, this.scene.arena);
        STATE.setState('place');
        this.scene.updateButtons();
    }

    handleUpgradeMult(cursor) {
        STATE.upgrades.strength += 1;
        STATE.multiplier *= 2;
        STATE.removeGold(this.pricing);
        this.scene.uicorner.setGold(STATE.gold)
        this.scene.updateButtons();
    }

    handleButton() {
        if (STATE.state === 'upgrade') {
            STATE.setState('play');
            this.scene.scene.start('ArenaScene');
        } else if (STATE.state === 'place') {
            STATE.setState('upgrade');
            this.text.text = 'Arena';
            this.scene.placing.destroy();
            this.scene.updateButtons();
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

    justPlaced() {
        this.updateButtons();
        this.arena.reset();
        this.fillArena();
        this.uicorner.setGold(STATE.gold);
    }

    fillArena() {
        STATE.arenaState.forEach(el => {
            let added = this.arena.add(el[0], el[1]);
            added.initPlacing();
        });
    }
}
