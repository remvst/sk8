class MenuScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);
        world.camera.followedTarget = null;
    }

    setupActualWorld() {
        super.setupActualWorld();

        const { hero } = this.world;
        hero.input = new EmptyInput();

        hero.x = evaluate(-(CANVAS_WIDTH / 2 + 100)) * pick([-1, 1]);
        hero.y = evaluate(CANVAS_HEIGHT / 2) * rnd(-0.8, 0.8) * pick([-1, 1]);

        const squatX = rnd(-0.3, 0.3) * evaluate(CANVAS_WIDTH / 2);

        hero.angle = atan2(-hero.y, -hero.x);
        hero.speed = 500;

        hero.input.direction = () => hero.angle;
        hero.input.squat = () => between(squatX, hero.x, squatX + 200);

        if (random() < 0.5) hero.input.trick = () => hero.velocityZ > 0;

        const targetAngle = hero.angle + pick([0, -1, 1, 2, -2]) * PI;
        hero.input.rotation = () => sign(targetAngle - hero.angle);
    }

    setupDemoWorld() {
        this.demoWorld = null;
    }

    cycle(elapsed) {
        if (this.world.hero.bailed || abs(this.world.hero.x) > evaluate(CANVAS_WIDTH / 2 + 100)) {
            this.setupActualWorld();
        }

        super.cycle(elapsed);
    }
}
