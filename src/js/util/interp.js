linear = t => t;
easeOutQuad = t => t * (2 - t);
easeOutCirc = t => sqrt(1 - pow(t - 1, 2))
easeOutBounce = t => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
        return n1 * t * t;
    }
    if (t < 2 / d1) {
        return n1 * (t -= 1.5 / d1) * t + 0.75;
    }
    if (t < 2.5 / d1) {
        return n1 * (t -= 2.25 / d1) * t + 0.9375;
    }
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
}

interp = (
    obj,
    property,
    fromValue,
    toValue,
    duration,
    delay,
    easing,
    endCallback
) => {
    let progress = 0;

    const interpolation = {
        'cycle': e => {
            progress += e;

            const progressAsRatio = limit(0, (progress - (delay || 0)) / duration, 1);
            obj[property] = (easing || linear)(progressAsRatio) * (toValue - fromValue) + fromValue;

            if (progressAsRatio >= 1) {
                remove(INTERPOLATIONS, interpolation);
                endCallback && endCallback();
            }
        }
    };
    interpolation.cycle(0);
    INTERPOLATIONS.push(interpolation);
};

INTERPOLATIONS = [];
