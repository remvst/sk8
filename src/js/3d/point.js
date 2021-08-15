class Point {
    constructor(x = 0, y = 0, z = 0) {
        this.set(x, y, z);
    }

    projectToActual() {
        return new Point(
            this.x,
            this.y - this.z * 0.25,
        );
    }

    projectToShadow() {
        return new Point(
            this.x + this.z * 0.25,
            this.y - this.z * 0.25,
        );
    }

    reset() {
        this.set(0, 0, 0);
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get zIndex() { return this.y; }
}
