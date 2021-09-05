class Camera {
    constructor() {
        this.followedTarget = null;
        this.center = point();
    }

    get x() {
        return this.center.projectToActual().x - evaluate(CANVAS_WIDTH / 2);
    }

    get y() {
        return this.center.projectToActual().y - evaluate(CANVAS_HEIGHT / 2);
    }

    cycle(elapsed) {
        if (this.followedTarget) {
            this.center.set(this.followedTarget.x, this.followedTarget.y, this.followedTarget.z);
        }
    }

    contains(point, radius) {
        // Disable visibility checks in case we're in a tutorial
        if (G.scene.demoWorld) return true;

        const center = this.center.projectToActual();
        return abs(center.x - point.x) < evaluate(CANVAS_WIDTH / 2) + radius &&
            abs(center.y - point.y) < evaluate(CANVAS_HEIGHT / 2) + radius;
    }
}
