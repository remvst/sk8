class Camera {
    constructor() {
        this.followedTarget = null;
        this.centerX = 0;
        this.centerY = 0;
    }

    get x() {
        return this.centerX - CANVAS_WIDTH / 2;
    }

    get y() {
        return this.centerY - CANVAS_HEIGHT / 2;
    }

    cycle(elapsed) {
        if (this.followedTarget) {
            this.centerX = this.followedTarget.x;
            this.centerY = this.followedTarget.y;
        }
    }
}
