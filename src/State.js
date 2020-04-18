class _State {
    constructor() {
        this.combo = 0;
    }
    incCombo() {
        this.combo += 1;
    }
}
  
const STATE = new _State();
export default STATE;
