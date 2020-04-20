
import Arena from '../objects/Arena';
import {
    gladiatorGenerator
} from '../placeables/Gladiator';
import STATE from '../State';
import Button from '../ui/Button';
import CheckBox from '../ui/Checkbox';
import UICorner from '../objects/UICorner';

class ArenaScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'ArenaScene'
        });
    }

    create() {
        this.uilock = false;
        this.arena = new Arena(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 640, 400, 10, this, false);
        this.pointer = this.add.image(this.sys.game.config.width / 2, 160, 'pointer');
        // this.pointer = this.add.rectangle(this.sys.game.config.width / 2, 120, 10, 40, 0x000000);
        this.pointer.setOrigin(0.5, 0);
        this.pointer.scale = 0.5;

        this.fillArena();

        this.input.on('pointermove', this.handleMouseMove, this);
        this.input.on('pointerdown', this.handleMouseClick, this);
        this.input.keyboard.on('keydown_SPACE', this.handleSpace, this);

        this.initButtons();
        this.uicorner = new UICorner(this, STATE.gold);
        this.crowd = this.sound.add('crowd', {
            mute: STATE.effect,
            volume: 0.1,
            loop: true
        });

        this.crowd.play();
        this.crowd.setSeek(Phaser.Math.RND.between(0, 300));
    }

    initButtons() {
        let upgx = 125;
        let upgy = 750;
        let upgw = 200;
        let upgh = 50;
        let but = this.add.image(upgx, upgy, 'button');
        let hov = this.add.image(upgx, upgy, 'button_hover');
        let text = this.add.text(upgx - upgw / 2, upgy - upgh / 4, 'Upgrade', {
            fontFamily: 'Arial',
            fixedWidth: 200,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });

        this.upgradBtn = new Button(upgx, upgy, upgw, upgh, but, hov, {}, text, this.handleButton, this);

        this.musicbtn = new CheckBox(50, 50, 64, 64, 'music_on', 'music_off', STATE.music, this.musicToggle, this);
        this.effectbtn = new CheckBox(150, 50, 64, 64, 'effect_on', 'effect_off', STATE.effect, this.effectToggle, this);
        console.log(STATE.music, STATE.effect);

    }

    musicToggle() {
        STATE.music = !STATE.music;
        this.flip();
        this.scene.uilock = true;
    }

    effectToggle() {
        STATE.effect = !STATE.effect;
        this.scene.crowd.setMute(STATE.effect);
        this.flip();
        this.scene.uilock = true;
    }

    handleButton() {
        if (STATE.state === 'play') {
            STATE.setState('upgrade');
            this.scene.scene.start('UpgradeScene');
        } else {
            STATE.addGold(STATE.combo * STATE.multiplier);
            STATE.resetCooldown();
            STATE.resetCombo();
            STATE.setState('upgrade');
            this.scene.scene.start('UpgradeScene');
        }
        this.scene.crowd.destroy();
    }

    handleSpace(event) {
        STATE.setState('place');
    }

    handleMouseClick(cursor) {
        if (cursor.button === 0) {
            this.upgradBtn.handleMouseClick(cursor);
            this.musicbtn.handleMouseClick(cursor)
            this.effectbtn.handleMouseClick(cursor)
            if (STATE.state === 'play' && !this.uilock) {
                let angle = this.pointer.rotation - Math.PI / 2;
                let dy = Math.sin(angle);
                let dx = Math.cos(angle);
                this.victim.body.setVelocity(-3000 * dx, -3000 * dy);
                this.victim.body.setAngularVelocity(Phaser.Math.RND.between(-1000, 1000));
                STATE.setState('combo');
                this.sound.play('aargh', { mute: STATE.effect, volume: 0.5 });
            } else {
                this.uilock = false;
            }
        }
    }

    handleMouseMove(cursor) {
        this.upgradBtn.handleMouseMove(cursor);
        this.musicbtn.handleMouseMove(cursor)
        this.effectbtn.handleMouseMove(cursor)
        if (STATE.state === 'play') {
            let angle = Phaser.Math.Angle.Between(this.sys.game.config.width / 2, 120, cursor.x, cursor.y);

            angle += Math.PI / 2;
            if (angle < 0) {
                angle += 2 * Math.PI;
            }

            angle = Phaser.Math.Clamp(angle, 3 * Math.PI / 4, 5 * Math.PI / 4);
            this.pointer.rotation = angle - Math.PI;
        } else if (STATE.state === 'place') {

        }
    }

    update() {
        this.uicorner.setGold(STATE.gold);
        if (STATE.state === 'combo') {
            let ratio = STATE.cooldown / STATE.maxCooldown;
            this.uicorner.setCooldown(ratio);
            this.crowd.setVolume(0.1 + ratio / 2);
            this.uicorner.setCombo(STATE.combo);
            this.arena.update();
            this.upgradBtn.text.text = 'End Combo'
        }
        else {
            this.upgradBtn.text.text = 'Upgrade'
        }

    }

    fillArena() {
        this.victim = this.arena.add(gladiatorGenerator, [this.sys.game.config.width / 2, 160]);
        this.arena.setVictim(this.victim);
        STATE.arenaState.forEach(el => {
            this.arena.add(el[0], el[1]);
        });
    }

    resetArena() {
        this.arena.reset();
        this.fillArena();
    }
}

export default ArenaScene;
