class Scene {
    constructor() {
        this.hud = new HUD();
    }

    restart() {
        this.age = 0;
        this.setupActualWorld();
        this.setupDemoWorld();
    }

    setupWorld(world) {
        world.scene = this;
    }

    setupActualWorld() {
        this.world = new World();
        this.world.addHero(new Hero(new Input()));
        this.setupWorld(this.world);
    }

    setupDemoWorld() {
        this.demoWorld = new World();
        this.demoWorld.scene = this;
        this.demoWorld.addHero(new Hero(new EmptyInput()));
        this.setupWorld(this.demoWorld);
    }

    cycle(elapsed) {
        this.age += elapsed;
        this.world.cycle(elapsed);
        if (this.demoWorld) this.demoWorld.cycle(elapsed);
        this.hud.cycle(elapsed);
    }

    render() {
        this.world.render();

        wrap(() => {
            if (!this.demoWorld) return;

            const worldScale = 0.3;
            translate(
                CANVAS_WIDTH - 50 - CANVAS_WIDTH * worldScale,
                50,
            );
            fs('#fff');
            fr(-2, -2, CANVAS_WIDTH * worldScale + 4, CANVAS_HEIGHT * worldScale + 4);

            scale(worldScale, worldScale);
            fs('#170e65');
            beginPath();
            rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            fill();
            clip();
            this.demoWorld.render();
        });

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

        this.hud.render();
    }
}
