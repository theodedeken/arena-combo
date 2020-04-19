import STATE from '../State';

export default class Arena {
    constructor(x, y, width, height, radius, scene, noclip) {
        this.scene = scene;
        this.bg = this.scene.add.image(x, y, 'background');
        this.sprite = this.scene.add.image(x, y, 'arena');
        
        // this.stands = this.scene.add.ellipse(x, y, width + 200, height + 200, 0xedddaf);
        // this.emperor = this.scene.add.rectangle(x, y - width / 2 + 100, 200, 75, 0x7056a3);
        // this.ground = this.scene.add.ellipse(x, y, width, height, 0xab7f07);

        this.boundsWidth = width - radius * 2;
        this.boundsHeight = height - radius * 2;
        this.hw = (this.boundsWidth) / 2;
        this.hh = (this.boundsHeight) / 2;
        this.c = Math.sqrt(this.hw * this.hw - this.hh * this.hh);
        this.f1 = new Phaser.Math.Vector2(x - this.c, y);
        this.f2 = new Phaser.Math.Vector2(x + this.c, y);
        this.gladiators = this.scene.physics.add.group();
        if (noclip) {
            // this.scene.physics.add.overlap(this.gladiators, this.gladiators, () => this.overlap);
        } else {
            this.scene.physics.add.collider(this.gladiators, this.gladiators, this.gladiatorOnGladiator);
        }
        this.waiting = true;
    }

    gladiatorOnGladiator(gladiator1, gladiator2) {
        STATE.incCombo();
        STATE.resetCooldown();
        
        gladiator1.body.setAngularVelocity(Phaser.Math.RND.between(-500, 500));
        gladiator2.body.setAngularVelocity(Phaser.Math.RND.between(-500, 500));

        let vel = gladiator1.body.velocity.length() + gladiator2.body.velocity.length();
        if (vel < 20) {
            gladiator1.body.velocity.scale(10);
            gladiator2.body.velocity.scale(10);
        }
    }

    count() {
        STATE.incCombo();
        STATE.resetCooldown();
    }

    add(generator, args) {
        let generated = generator(args, this.scene, this);
        generated.initPhysics();
        return generated;
    }

    addGladiator(gladiator) {
        this.gladiators.add(gladiator);
    }

    setVictim(victim) {
        this.victim = victim;
    }

    reset() {
        this.waiting = true;
        this.gladiators.children.each(el => el.destroy());
        this.gladiators.clear();
    }

    dist(x, y) {
        return Phaser.Math.Distance.Between(this.f1.x, this.f1.y, x, y) + Phaser.Math.Distance.Between(this.f2.x, this.f2.y, x, y);
    }

    update() {
        if (this.waiting) {
            let dist = Phaser.Math.Distance.BetweenPoints(this.f1, this.victim.body.center) + Phaser.Math.Distance.BetweenPoints(this.f2, this.victim.body.center);
            if (dist < this.boundsWidth) {
                this.waiting = false;
            }
        } else if (STATE.cooldown === 0) {
            STATE.addGold(STATE.combo * STATE.multiplier);
            STATE.resetCooldown();
            STATE.resetCombo();
            STATE.state = 'play';
            this.scene.resetArena();
        } else {
            STATE.decCooldown();
            this.gladiators.children.each(element => {
                let curPos = element.body.center;
                let nextPos = element.body.center.clone().add(element.body.velocity.clone().scale(1 / 60));
                let curDist = Phaser.Math.Distance.BetweenPoints(this.f1, curPos) + Phaser.Math.Distance.BetweenPoints(this.f2, curPos);
                let nextDist = Phaser.Math.Distance.BetweenPoints(this.f1, nextPos) + Phaser.Math.Distance.BetweenPoints(this.f2, nextPos);
                if (curDist > this.boundsWidth && nextDist > curDist) {
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
                    element.body.velocity.scale(0.85);
                    this.count();
                }
            });
        }
    }
}
