class MenuScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);
        world.camera.followedTarget = null;
    }

    setupActualWorld() {
        super.setupActualWorld();

        const { hero } = this.world;
        hero.input = new EmptyInput();;

        const signX = pick([-1, 1]);
        const signY = pick([-1, 1]);
        hero.x = evaluate(-(CANVAS_WIDTH / 2 + 100)) * signX;
        hero.y = evaluate(CANVAS_HEIGHT / 2) * rnd(-0.8, 0.8) * signY;

        const squatX = rnd(-0.3, 0.3) * evaluate(CANVAS_WIDTH / 2);

        hero.angle = atan2(-hero.y, -hero.x);
        hero.speed = 500;

        hero.input.direction = () => hero.angle;
        hero.input.squat = () => between(squatX, hero.x, squatX + 200);

        if (random() < 0.5) hero.input.trick = () => hero.velocityZ > 0;
        if (random() < 0.5) {
            const targetAngle = hero.angle + pick([-1, 1, 2, -2]) * PI;
            hero.input.rotation = () => sign(targetAngle - hero.angle);
        }
    }

    setupDemoWorld() {
        this.demoWorld = null;
    }

    cycle(elapsed) {
        // console.log(this.world.hero.x - evaluate(CANVAS_WIDTH / 2));
        if (this.world.hero.bailed || abs(this.world.hero.x) > evaluate(CANVAS_WIDTH / 2 + 100)) {
            this.setupActualWorld();
        }

        super.cycle(elapsed);
    }
}
