import {
    spinnerpricing
} from '../functions';

import STATE from '../State'

export default class Spinner extends Phaser.GameObjects.Image {
    constructor(x, y, scene, arena) {
        super(scene, x, y, 'spinner');
        this.arena = arena;
        this.scene.physics.add.existing(this, 0);
        this.scene.add.existing(this);
        this.placeradius = 25;
        this.key = 'spinner';
        this.pricing = spinnerpricing;
    }

    initPhysics() {
        this.arena.addOil(this);
        this.body.setCircle(16, 0, 0);
    }

    initPlacing() {
        this.body.setCircle(this.placeradius, -10, -10);
    }
}

export function spinnerGenerator(args, scene, arena) {
    return new Spinner(...args, scene, arena);
}
