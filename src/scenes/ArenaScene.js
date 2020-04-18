
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
        // this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.add.ellipse(400, 300, 800, 600, 0xff00ff);
        this.col = this.physics.add.group();
        
        this.victim = createCircle(this, this.col, 0, 300, 20);
        
        this.victim.body.setVelocity(5500, 150);
        
        this.bouncer = createCircle(this, this.col, 500, 400, 20);

        this.bouncer1 = createCircle(this, this.col, 400, 370, 20);
        this.bouncer2 = createCircle(this, this.col, 500, 340, 20);
        createCircle(this, this.col, 300, 500, 20);
        createCircle(this, this.col, 500, 300, 20);
        createCircle(this, this.col, 450, 350, 20);
        createCircle(this, this.col, 600, 100, 20);

        this.physics.add.collider(this.col, this.col);

        this.c = Math.sqrt(70000);
        this.f1 = new Phaser.Math.Vector2(400 - this.c, 300);
        this.f2 = new Phaser.Math.Vector2(400 + this.c, 300);
    }

    update() {
        this.col.children.each(element => {
            let curPos = element.body.center;
            let nextPos = element.body.center.clone().add(element.body.velocity.clone().scale(1 / 60));
            let curDist = Phaser.Math.Distance.BetweenPoints(this.f1, curPos) + Phaser.Math.Distance.BetweenPoints(this.f2, curPos);
            let nextDist = Phaser.Math.Distance.BetweenPoints(this.f1, nextPos) + Phaser.Math.Distance.BetweenPoints(this.f2, nextPos);
            if (curDist > 800 && nextDist > curDist) {
                let u = this.f1.clone().subtract(element.body.center);
                let v = this.f2.clone().subtract(element.body.center);
                let ulen = u.length();
                let vlen = v.length();
                u.scale(vlen);
                v.scale(ulen);
                u.add(v);
                u.normalize();
                u.scale(2 * element.body.velocity.dot(u));
                
                element.body.velocity.subtract(u);
                element.body.velocity.scale(0.99);
            }
        });
    }
}

function createCircle(scene, group, x, y, radius) {
    let victim = scene.add.circle(x, y, radius, 0x931f9c);
    scene.physics.add.existing(victim, 0);
    group.add(victim);
   
    victim.body.setBounce(0.99, 0.99);
    victim.body.setDrag(0.99, 0.99);
    victim.body.useDamping = true;
    victim.body.setCircle(radius, 0, 0);
    victim.body.setMass(radius);
    return victim;
}

export default ArenaScene;
