export default class Gladiator extends Phaser.GameObjects.Image {
    constructor(x, y, radius, scene, arena) {
        super(scene, x, y, 'gladiator');
        // this.scene = scene;
        this.arena = arena;
        // this.gladiator = this.scene.add.circle(x, y, radius, 0x931f9c);
        this.scene.physics.add.existing(this, 0);
        this.scene.add.existing(this);
        arena.addGladiator(this);
       
        this.body.setBounce(1.01, 1.01);
        this.body.setDrag(0.98, 0.98);
        this.body.useDamping = true;
        this.body.setCircle(radius, 0, 0);
        this.body.setMass(radius);
        this.body.setAllowRotation();
        this.body.setAngularDrag(50);
        
        // this.body.setAngularVelocity(100);
        // scene.physics.world.enable(this);
    }
}

export function gladiatorGenerator(args, scene, arena) {
    return new Gladiator(...args, scene, arena);
}
