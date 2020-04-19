
import Arena from '../objects/Arena';
import {
    gladiatorGenerator
} from '../placeables/Gladiator';
import STATE from '../State';
import Button from '../ui/Button';

class ArenaScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'ArenaScene'
        });
    }

    create() {
        this.arena = new Arena(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 800, 500, 10, this, false);
        this.pointer = this.add.image(this.sys.game.config.width / 2, 120, 'pointer');
        // this.pointer = this.add.rectangle(this.sys.game.config.width / 2, 120, 10, 40, 0x000000);
        this.pointer.setOrigin(0.5, 0);
        this.pointer.scale = 0.5;

        this.cooldown = this.add.rectangle(1000, 715, 250, 25, 0x0000aa);
        this.cooldown.setOrigin(0, 0.5);
        this.cooldown.scaleX = 0;
        
        this.fillArena();

        this.input.on('pointermove', this.handleMouseMove, this);
        this.input.on('pointerdown', this.handleMouseClick, this);
        this.input.keyboard.on('keydown_SPACE', this.handleSpace, this);

        this.combo = this.add.text(1000, 650, 'Combo', {
            fontFamily: 'Arial',
            fixedWidth: 250,
            fontSize: '30pt',
            color: '#000000',
            align: 'center'
        });

        this.gold = this.add.text(1000, 750, 'Gold', {
            fontFamily: 'Arial',
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });

        this.initButtons();
    }

    initButtons() {
        let upgx = 150;
        let upgy = 750;
        let upgw = 200;
        let upgh = 50;
        let but = this.add.rectangle(upgx, upgy, upgw, upgh, 0x666666);
        let hov = this.add.rectangle(upgx, upgy, upgw, upgh, 0x660000);
        let text = this.add.text(upgx - upgw / 2, upgy - upgh / 4, 'Upgrade', {
            fontFamily: 'Arial',
            fixedWidth: 200,
            fontSize: '20pt',
            color: '#000000',
            align: 'center'
        });

        this.upgradBtn = new Button(upgx, upgy, upgw, upgh, but, hov, {}, text, this.handleButton, this);
    }

    handleButton() {
        if (STATE.state === 'play') {
            STATE.setState('upgrade');
            this.scene.scene.start('UpgradeScene');
        } else {
            // TODO end combo 
            STATE.setState('upgrade');
            this.scene.scene.start('UpgradeScene');
        }
    }

    handleSpace(event) {
        STATE.setState('place');
    }

    handleMouseClick(cursor) {
        if (cursor.button === 0) {
            this.upgradBtn.handleMouseClick(cursor);
            if (STATE.state === 'play' && cursor.button === 0) {
                let angle = this.pointer.rotation - Math.PI / 2;
                let dy = Math.sin(angle);
                let dx = Math.cos(angle);
                this.victim.body.setVelocity(-3000 * dx, -3000 * dy);
                this.victim.body.setAngularVelocity(Phaser.Math.RND.between(-1000, 1000));
                STATE.setState('combo');
            } else if (STATE.state === 'place') {
                if (cursor.button === 0) {
                    // place the object if possible
                }
            } else if (STATE.state === 'move') {
    
            }
        }
    }

    handleMouseMove(cursor) {
        this.upgradBtn.handleMouseMove(cursor);
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
        this.gold.text = STATE.gold;
        if (STATE.state === 'combo') {
            this.combo.text = STATE.combo + 'x';
            this.arena.update();
            let ratio = STATE.cooldown / STATE.maxCooldown;
            this.cooldown.scaleX = ratio;
        }
    }

    fillArena() {
        this.victim = this.arena.add(gladiatorGenerator, [this.sys.game.config.width / 2, 120]);
        this.arena.setVictim(this.victim);
        STATE.arenaState.forEach(el => {
            this.arena.add(el[0], el[1]);
        });
    }

    resetArena() {
        this.arena.reset();
        this.fillArena();
        this.cooldown.scaleX = 0;
    }
}

export default ArenaScene;
