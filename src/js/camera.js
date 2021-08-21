class Camera {
    constructor() {
        this.followedTarget = null;
        this.center = new Point();
    }

    get x() {
        return this.center.x - CANVAS_WIDTH / 2;
    }

    get y() {
        return this.center.y - CANVAS_HEIGHT / 2;
    }

    cycle(elapsed) {
        // console.log('yo');
        if (this.followedTarget) {
            this.center.set(this.followedTarget.x, this.followedTarget.y, this.followedTarget.z);
        }
    }
}
