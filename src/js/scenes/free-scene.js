class FreeScene extends Scene {
    setupWorld() {
        super.setupWorld();

        const myInput = new EmptyInput();
        myInput.pushing = () => this.age > 1 && this.age < 3;

        // this.world.addElement(this.simulatedHero = new SimulatedDraggable());

        // const otherHero =

        // this.world.addHero(new Hero(new Input()));
        this.world.addHero(new Hero(myInput));

        const kicker = new Kicker();
        kicker.y = 200;
        this.world.addElement(kicker);

        const kickerLand = new Kicker();
        kickerLand.y = 200;
        kickerLand.x = 400;
        kickerLand.angle = PI;
        this.world.addElement(kickerLand);

        const kicker2 = new Kicker();
        kicker2.y = -175;
        kicker2.x = -350;
        kicker2.angle = PI / 4;
        this.world.addElement(kicker2);

        this.world.addElement(new Rail([
            new Point(400, 400, 200),
            new Point(800, 400, 200),
            new Point(1200, 400, 400),
            new Point(1600, 400, 400),
            new Point(1800, 500, 400),
        ]));

        this.world.addElement(new Rail([
            new Point(-200, -400, 200),
            new Point(-800, -400, 200),
            new Point(-1200, -600, 200),
        ]));
    }
}
