class Point {
    constructor(x = 0, y = 0, z = 0) {
        this.set(x, y, z);
    }

    projectToActual() {
        this.actualPoint = this.actualPoint || new Point();
        return this.actualPoint.set(
            this.x,
            this.y - this.z * 0.4,
        );
    }

    projectToShadow() {
        this.shadowPoint = this.shadowPoint || new Point();
        return this.shadowPoint.set(
            this.x + this.z * 0.2,
            this.y - this.z * 0.2,
        );
    }

    reset() {
        return this.set(0, 0, 0);
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    get zIndex() { return this.y; }
}
