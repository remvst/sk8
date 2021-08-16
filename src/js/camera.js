class Camera {
    constructor() {
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
        this.centerX = G.world.hero.x;
        this.centerY = G.world.hero.y;
    }
}
