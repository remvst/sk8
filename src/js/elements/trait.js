class Trait {

    get x() { return this.element.x; }
    get y() { return this.element.y; }

    set x(x) { this.element.x = x; }
    set y(y) { this.element.y = y; }

    trait(key) {
        return this.element.traitMap[key];
    }

    cycle(elapsed) {

    }

    render() {

    }
}
