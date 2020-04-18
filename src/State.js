class _State {
    constructor() {
        this.combo = 0;
        this.state = 'play';
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
