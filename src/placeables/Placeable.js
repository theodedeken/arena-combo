import STATE from '../State';

export default class Placeable extends Phaser.GameObjects.Arc {
    constructor(x, y, generator, scene, arena) {
        let generated = generator([x, y], scene, arena);
        super(scene, x, y, generated.placeradius);// , 0, 360, false, 0x55003300);
        this.setFillStyle(0x006600, 0.5);
        this.generator = generator;
        this.generated = generated;
        this.generated.setDepth(1);
        this.scene.physics.add.existing(this, 0);
        this.scene.add.existing(this);
        this.body.setCircle(generated.placeradius, 0, 0);

        this.arena = arena;
    }

    handleMouseMove(cursor) {
        this.setPosition(cursor.x, cursor.y);
        this.generated.setPosition(cursor.x, cursor.y);
        if (STATE.state === 'place') {
            if (this.arena.dist(cursor.x, cursor.y) < 800 - 2 * this.generated.placeradius && !this.scene.physics.world.overlap(this, this.arena.gladiators)) {
                this.setFillStyle(0x006600, 0.5);
            } else {
                this.setFillStyle(0x660000, 0.5);
            }
        }
    }

    handleMouseClick(cursor) {
        if (STATE.state === 'place') {
            if (this.arena.dist(cursor.x, cursor.y) < 800 - 2 * this.generated.placeradius && !this.scene.physics.world.overlap(this, this.arena.gladiators)) {
                this.scene.upgrade1.show();
                this.scene.upgrade2.show();
                this.scene.upgrade3.show();
                this.scene.place1.show();
                this.scene.place2.show();
                this.scene.place3.show();
                STATE.setState('upgrade');
                this.scene.mainBtn.text.text = 'Arena';
                STATE.addtoArena(this.generator, [cursor.x, cursor.y]);
                this.scene.resetArena();
                this.destroy();
            } else {
                console.log('outside');
            }
        }
    }
    destroy() {
        this.generated.destroy();
        super.destroy();
    }
}
