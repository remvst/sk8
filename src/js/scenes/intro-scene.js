class IntroScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);

        this.rail = new Rail([
            point(-200, -200 * 0.4, 200),
            point(200, 200 * 0.4, 200),
        ]);
        world.addElement(this.rail);

        world.camera.followedTarget = null;
        world.camera.center.y = -100;
    }

    setupActualWorld() {
        super.setupActualWorld();

        const { hero } = this.world;
        hero.input = new EmptyInput();

        hero.x = -1000;
        hero.y = -1000 * 0.4;

        const angle = angleBetween(hero, this.rail.points[0]);
        hero.angle = angle;
        hero.speed = 500;
        hero.renderables = [hero.renderables[0]];
        hero.input.direction = () => angle;
        hero.input.squat = () => between(-600, hero.x, -350) || hero.grinding;
        hero.input.grind = () => between(-200, hero.x, 100);
        hero.input.trick = () => between(-350, hero.x, -300);
        hero.input.rotation = () => hero.x > 100 && hero.angle < angle + PI ? 0.5 : 0;
    }

    setupDemoWorld() {
        this.demoWorld = null;
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (this.world.hero.bailed || this.world.hero.x > evaluate(CANVAS_WIDTH / 2 + 400)) {
            G.mainMenu();
        }
    }
}
