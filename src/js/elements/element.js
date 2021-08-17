class Element {
    constructor() {
        this.x = this.y = this.z = this.angle = this.age = 0;
        this.previous = new Point();
        this.renderables = [];
        this.points = [];
        this.topZ = 0;

        this.centerPoint = new Point();
    }

    cycle(elapsed) {
        this.age += elapsed;
        this.previous.set(this.x, this.y, this.z);
    }

    prerender() {
        this.centerPoint.set(this.x, this.y, this.z);
        this.updateRenderables();
    }

    updateRenderables() {

    }

    newPoint() {
        const point = new Point();
        this.points.push(point);
        return point;
    }

    adjustPoints() {
        this.rotateAroundAxis(0, 0, this.angle);

        this.points.forEach(pt => {
            pt.x += this.x;
            pt.y += this.y;
            pt.z += this.z;
        });
    }

    rotateAroundAxis(x, y, rotation) {
        this.points.forEach(pt => {
            const currentAngle = atan2(pt.y - y, pt.x - x);
            const currentDist = sqrt(pow(pt.x - x, 2) + pow(pt.y - y, 2));

            pt.x = x + currentDist * cos(rotation + currentAngle);
            pt.y = y + currentDist * sin(rotation + currentAngle);
        });
    }

    get minY() {
        return this.y;
    }

    contains(position) {
        return false;
    }

    renderBefore(other) {
        // if (this.contains(other)) {
        //     // console.log();
        //     return true;
        // }

        return this.minY < other.minY;
    }
}
