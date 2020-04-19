import {
    gladiatorpricing
} from '../functions';

export default class Gladiator extends Phaser.GameObjects.Image {
    constructor(x, y, scene, arena) {
        super(scene, x, y, 'gladiator');
        this.arena = arena;
        this.scene.physics.add.existing(this, 0);
        this.scene.add.existing(this);
        this.placeradius = 25;
        this.key = 'gladiator';
        this.pricing = gladiatorpricing;
    }

    initPhysics() {
        this.arena.addGladiator(this);
       
        this.body.setBounce(0.9, 0.9);
        this.body.setDrag(0.98, 0.98);
        this.body.useDamping = true;
        this.body.setCircle(16, 0, 0);
        this.body.setMass(100);
        this.body.setAllowRotation();
        this.body.setAngularDrag(50);
    }

    initPlacing() {
        this.body.setCircle(this.placeradius, -10, -10);
    }
}

export function gladiatorGenerator(args, scene, arena) {
    return new Gladiator(...args, scene, arena);
}
