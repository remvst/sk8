class DemoScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);

        // const kickerLand = new Kicker();
        // // kickerLand.y = 200;
        // kickerLand.x = 350;
        // kickerLand.angle = PI;
        // world.addElement(kickerLand);

        const kicker2 = new Kicker();
        // kicker2.y = -175;
        kicker2.x = -350;
        kicker2.angle = 0;
        // world.addElement(kicker2);

        this.rail = new Rail([
            new Point(-200, -200 * 0.4, 200),
            new Point(200, 200 * 0.4, 200),
        ])

        world.addElement(this.rail);
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
        hero.input.squat = () => between(-450, hero.x, -350) || hero.grinding;
        hero.input.grind = () => between(-200, hero.x, 100);
        hero.input.trick = () => between(-350, hero.x, -300);
        hero.input.rotation = () => hero.x > 100 && hero.angle < angle + PI ? 0.5 : 0;

        this.world.camera.followedTarget = null;
        this.world.camera.centerY = -100;
    }

    setupDemoWorld() {
        this.demoWorld = null;
    }

    cycle(elapsed) {
        super.cycle(elapsed);
        if (this.world.hero.x > 600) this.setupActualWorld();
    }
}
