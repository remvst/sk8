class Camera {
    constructor() {
        this.followedTarget = null;
        this.center = point();
    }

    get x() {
        return this.center.projectToActual().x - CANVAS_WIDTH / 2;
    }

    get y() {
        return this.center.projectToActual().y - CANVAS_HEIGHT / 2;
    }

    cycle(elapsed) {
        // console.log('yo');
        if (this.followedTarget) {
            this.center.set(this.followedTarget.x, this.followedTarget.y, this.followedTarget.z);
        }
    }
}
