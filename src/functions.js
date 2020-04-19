export function gladiatorpricing(level) {
    let raw = exponential(100, level, 1.5);
    raw = Math.round(raw);
    raw -= raw % 10;
    return raw;
}

export function multiplierpricing(level) {
    let raw = exponential(1000, level, 1.6);
    raw = Math.round(raw);
    raw -= raw % 10;
    return raw;
}

export function healthpricing(level) {
    let raw = exponential(500, level, 1.4);
    raw = Math.round(raw);
    raw -= raw % 10;
    return raw;
}

export function bouncepricing(level) {
    let raw = exponential(750, level, 3);
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
