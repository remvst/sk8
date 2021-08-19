class FreeScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);

        this.timeLeft = 120;

        const kicker = new Kicker();
        kicker.y = 200;
        world.addElement(kicker);

        const kickerLand = new Kicker();
        kickerLand.y = 200;
        kickerLand.x = 400;
        kickerLand.angle = PI;
        world.addElement(kickerLand);

        const kicker2 = new Kicker();
        kicker2.y = -175;
        kicker2.x = -350;
        kicker2.angle = PI / 4;
        world.addElement(kicker2);

        const pole = new Pole();
        pole.x = 100;
        pole.y = -300;
        world.addElement(pole);

        world.addElement(new Rail([
            new Point(400, 400, 200),
            new Point(800, 400, 200),
            new Point(1200, 400, 400),
            new Point(1600, 400, 400),
            new Point(1800, 500, 400),
        ]));

        world.addElement(new Rail([
            new Point(-200, -400, 200),
            new Point(-800, -400, 200),
            new Point(-1200, -600, 200),
        ]));
    }

    setupDemoWorld() {
        super.setupDemoWorld();

        this.demoWorld = null;
    }

    cycle(elapsed) {
        super.cycle(elapsed);
        if (this.demoWorld.age > 4) this.setupDemoWorld();

        if (this.timeLeft > 0) {
            this.timeLeft = max(0, this.timeLeft - elapsed);
        }
    }
}
