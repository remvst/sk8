class Camera {
    constructor() {
        this.followedTarget = null;
        this.centerX = 0;
        this.centerY = 0;
        this.center = new Point();
    }

    get x() {
        return this.centerX - CANVAS_WIDTH / 2;
    }

    get y() {
        return this.centerY - CANVAS_HEIGHT / 2;
    }

    cycle(elapsed) {
        if (this.followedTarget) {
            this.center.set(this.followedTarget.x, this.followedTarget.y, this.followedTarget.z);
        }
        this.centerX = this.center.projectToActual().x;
        this.centerY = this.center.projectToActual().y;
    }
}
