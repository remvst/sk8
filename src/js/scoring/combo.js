rotationCount = rotation => {
    return abs(round(rotation / PI));
};

trickToString = ([name, x, trickCount, rotation]) => {
    const qualifier = [
        nomangle('DOUBLE '),
        nomangle('TRIPLE '),
        nomangle('QUADRUPLE '),
    ][floor(trickCount - 0.1) - 1] || '';

    return (rotationCount(rotation) * 180 || '') + ' ' + qualifier + name;
};

trickValue = ([name, trickValue, trickCount, rotation]) => {
    return trickCount * ~~trickValue * (1 + rotationCount(rotation));
};

class Combo {
    constructor() {
        this.tricks = [];
    }

    get stringRecap() {
        return this.tricks.slice(-5).map(trickToString).join('  +  ');
    }

    get asString() {
        return this.stringRecap + ' ' + this.total + ' x' + this.tricks.length;
    }

    pushTrick(name, baseValue = 0) {
        this.tricks.push([name, baseValue, 1, 0]);
    }

    accumulate(value) {
        if (this.tricks.length) {
            this.tricks[this.tricks.length - 1][1] += value;
        }
    }

    setCount(newCount) {
        if (this.tricks.length) {
            this.tricks[this.tricks.length - 1][2] = newCount;
        }
    }

    setRotation(rotation) {
        if (this.tricks.length) {
            this.tricks[this.tricks.length - 1][3] = rotation;
        }
    }

    get total() {
        return this.base * this.tricks.length;
    }

    get base() {
        return this.tricks.reduce((acc, trick) => acc + trickValue(trick), 0);
    }
}
