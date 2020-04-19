class _State {
    constructor() {
        this.combo = 0;
        this.gold = 100;
        this.cooldown = 180;
        this.maxCooldown = 180;
        this.state = 'boot';
        this.multiplier = 10;
        this.arenaState = [];
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
