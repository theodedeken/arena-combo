export function gladiatorpricing(level) {
    let raw = exponential(100, level, 1.5);
    raw = Math.round(raw);
    raw -= raw % 10;
    return raw;
}

function exponential(s, x, e) {
    for (let i = 1; i < x; i++) {
        s *= e;
    }
    return s;
}
