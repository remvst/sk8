class Trait {

    get age() { return this.element.age; }
    get x() { return this.element.x; }
    get y() { return this.element.y; }
    get angle() { return this.element.angle; }

    set x(x) { this.element.x = x; }
    set y(y) { this.element.y = y; }
    set angle(x) { this.element.angle = x; }

    trait(key) {
        return this.element.traitMap[key];
    }

    cycle(elapsed) {

    }

    render() {

    }
}
