class Element {
    constructor() {
        this.x = this.y = this.z = this.angle = 0;
        this.previous = new Point();
        this.renderables = [];
        this.points = [];
    }

    cycle(elapsed) {
        this.previous.set(this.x, this.y, this.z);
    }

    prerender() {
        this.updateRenderables();
    }

    updateRenderables() {

    }

    newPoint() {
        const point = new Point();
        this.points.push(point);
        return point;
    }

    resetPoints() {
        this.points.forEach(point => point.reset());
    }

    adjustPoints() {
        this.points.forEach(pt => {
            const currentAngle = atan2(pt.y, pt.x);
            const currentDist = sqrt(pow(pt.x, 2) + pow(pt.y, 2));

            pt.x = currentDist * cos(this.angle + currentAngle);
            pt.y = currentDist * sin(this.angle + currentAngle);

            pt.x += this.x;
            pt.y += this.y;
            pt.z += this.z;
        });
    }
}
