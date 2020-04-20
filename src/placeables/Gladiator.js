import {
    gladiatorpricing
} from '../functions';

import STATE from '../State'

export default class Gladiator extends Phaser.GameObjects.Image {
    constructor(x, y, scene, arena) {
        super(scene, x, y, 'gladiator');
        this.arena = arena;
        this.scene.physics.add.existing(this, 0);
        this.scene.add.existing(this);
        this.placeradius = 25;
        this.key = 'gladiator';
        this.pricing = gladiatorpricing;
        this.health = STATE.health;
    }

    initPhysics() {
        this.arena.addGladiator(this);

        this.body.setBounce(STATE.bounce, STATE.bounce);
        this.body.setDrag(0.98, 0.98);
        this.body.useDamping = true;
        this.body.setCircle(16, 0, 0);
        this.body.setMass(10);
        this.body.setAllowRotation();
        this.body.setAngularDrag(50);
    }

    initPlacing() {
        this.body.setCircle(this.placeradius, -10, -10);
    }

    hit() {
        this.health -= 1;
        if (this.health !== 0) {
            let key = Phaser.Math.RND.pick(STATE.hurts);
            let sound = this.scene.sound.add(key, {
                mute: STATE.effect,
                volume: 0.15
            });
            sound.play();
        }

    }

    die() {
        let key = Phaser.Math.RND.pick(STATE.deaths);
        let sound = this.scene.sound.add(key, {
            mute: STATE.effect,
            volume: 0.2
        });
        sound.play();

    }
}

export function gladiatorGenerator(args, scene, arena) {
    return new Gladiator(...args, scene, arena);
}
