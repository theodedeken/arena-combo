
import Arena from '../objects/Arena';
import STATE from '../State';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

class ArenaScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'ArenaScene'
        });
    }
    preload() {
        this.load.image('circle', 'assets/circle.svg');
    }

    create() {
        this.arena = new Arena(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 800, 500, 10, this);
        
        this.victim = this.arena.addGladiator(this.sys.game.config.width / 2, 120, 10);
        this.arena.setVictim(this.victim);
        this.pointer = this.add.rectangle(this.sys.game.config.width / 2, 120, 10, 40, 0x000000);
        this.pointer.setOrigin(0.5, 0);
        
        for (let i = 0; i < 5; i++) {
            let x = Phaser.Math.RND.between(440, 840);
            let y = Phaser.Math.RND.between(250, 550);
            this.arena.addGladiator(x, y, 10);
        }

        this.input.on('pointermove', this.handleMouseMove, this);
        this.input.on('pointerdown', this.handleMouseClick, this);
        this.input.keyboard.on('keydown_SPACE', this.handleSpace, this);

        let but = this.add.rectangle(150, 50, 200, 50, 0x666666);
        
        let chk = this.add.rectangle(150, 50, 200, 50, 0x000066);
        let hov = this.add.rectangle(150, 50, 200, 50, 0x660000);
        let text = this.add.text(50, 37.5, 'Upgrade', {
            fontFamily: '"Arial"',
            fixedWidth: 200,
            fontSize: '20pt',
            // fixedHeight: 25,
            color: '#000000',
            align: 'center'
        });
        this.upgradBtn = new Checkbox(150, 50, 200, 50, but, hov, chk, null, text, () => console.log('TEST'));
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
                this.victim.body.setVelocity(-5000 * dx, -5000 * dy);
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
        this.arena.update();
    }
}

export default ArenaScene;
