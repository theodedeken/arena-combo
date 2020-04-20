import {
    oilpricing
} from '../functions';

import STATE from '../State'

export default class Oil extends Phaser.GameObjects.Image {
    constructor(x, y, scene, arena) {
        super(scene, x, y, 'oil');
        this.arena = arena;
        this.scene.physics.add.existing(this, 0);
        this.scene.add.existing(this);
        this.placeradius = 40;
        this.key = 'oil';
        this.pricing = oilpricing;
    }

    initPhysics() {
        this.arena.addOil(this);
        this.body.setCircle(32, 0, 0);
    }

    initPlacing() {
        this.body.setCircle(this.placeradius, -10, -10);
    }
}

export function oilGenerator(args, scene, arena) {
    return new Oil(...args, scene, arena);
}
