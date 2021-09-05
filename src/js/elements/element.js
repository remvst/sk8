class Element {
    constructor() {
        this.x = this.y = this.z = this.angle = this.age = 0;
        this.previous = point();
        this.renderables = [];
        this.points = [];
    }

    cycle(elapsed) {
        this.age += elapsed;
        this.previous.set(this.x, this.y, this.z);
    }
    
    updateRenderables() {

    }

    newPoint() {
        const x = point();
        this.points.push(x);
        return x;
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
}
