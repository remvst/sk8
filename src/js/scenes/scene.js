class Scene {
    constructor() {
        this.age = 0;
        this.hud = new HUD();

        this.setupWorld();
    }

    setupWorld() {
        this.world = new World();
    }

    cycle(elapsed) {
        this.age += elapsed;
        this.world.cycle(elapsed);
        this.hud.cycle(elapsed);
    }

    render() {
        this.world.render();
        this.hud.render();

        const { hero } = this.world;
        if (hero && hero.input.userControlled) {
            wrap(() => {
                if (!hero.landed) return;

                translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

                R.fillStyle = '#fff';
                R.globalAlpha = 0.5;
                beginPath();
                arc(MOVEMENT_TARGET_DIRECTION.x, MOVEMENT_TARGET_DIRECTION.y, 20, 0, PI * 2);
                fill();
            });
        }
    }
}
