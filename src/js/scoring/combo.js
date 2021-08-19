rotationCount = rotation => {
    return abs(round(rotation / PI));
};

trickToString = ([name, value, count, rotation]) => {
    const qualifier = [
        nomangle('DOUBLE '),
        nomangle('TRIPLE '),
        nomangle('QUADRUPLE '),
    ][floor(count - 0.1) - 1] || '';

    return (rotationCount(rotation) * 180 || '') + ' ' + qualifier + name;
};

trickValue = ([name, value, count, rotation]) => {
    return count * ~~value * (1 + rotationCount(rotation));
};

class Combo {
    constructor() {
        this.tricks = [];
    }

    pushTrick(name, value = 0) {
        this.tricks.push([name, value, 1, 0]);
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
