class _State {
    constructor() {
        this.combo = 0;
        this.gold = 10000000;
        this.cooldown = 180;
        this.maxCooldown = 180;
        this.state = 'boot';
        this.multiplier = 10;
        this.health = 5;
        this.bounce = 0.9;
        this.effect = false;
        this.music = false;
        this.arenaState = [];
        this.upgrades = {
            gladiator: 1,
            pillar: 1,
            oil: 1,
            strength: 1,
            health: 1,
            bounce: 1
        };
        this.hurts = [
            'hurt_1',
            'hurt_2',
            'hurt_3',
            'hurt_4',
            'hurt_5',
            'hurt_6',
            'hurt_7',
            'hurt_8',
        ];
        this.deaths = [
            'death_1',
            'death_2',
            'death_3'
        ];
        this.wallhits = [
            'hit_wall_1',
            'hit_wall_2',
            'hit_wall_3',
        ];
        this.spikehits = [
            'hit_spike_1',
            'hit_spike_2',
            'hit_spike_3',
        ]
    }

    addtoArena(generator, args) {
        this.arenaState.push([generator, args]);
    }

    addGold(amount) {
        this.gold += amount;
    }

    removeGold(amount) {
        this.gold -= amount;
    }

    resetCooldown() {
        this.cooldown = 180;
    }

    decCooldown() {
        this.cooldown -= 1;
    }

    resetCombo() {
        this.combo = 0;
    }

    incCombo() {
        this.combo += 1;
    }
    setState(state) {
        this.state = state;
    }
}

const STATE = new _State();
export default STATE;
