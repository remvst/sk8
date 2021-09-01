class FreeScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);

        this.timeLeft = 120;
        this.ended = false;

        this.score = 0;

        const spacing = 1000;
        const radius = spacing * 3;

        const translate = (x, y = 0, z = 0) => (pt) => point(pt.x + x, pt.y + y, pt.z + z);
        const scale = (x, y = 1, z = 1) => (pt) => point(pt.x * x, pt.y * y, pt.z * z);
        const rotate = (rotation) => pt => {
            const distance = dist(pt, point());
            const angle = atan2(pt.y, pt.x);
            return point(
                cos(angle + rotation) * distance,
                sin(angle + rotation) * distance,
                pt.z,
            );
        };
        const multi = (...transforms) => pt => {
            let transformed = pt;
            transforms.forEach(transformation => transformed = transformation(transformed));
            return transformed;
        };

        const transforms = [
            x => point(x.x, -x.y, x.z),
            x => point(x.y, x.x, x.z),
            x => point(-x.y, x.x, x.z),
        ];

        const identity = x => x;

        [
            identity,
            x => point(x.y, x.x, x.z),
        ].forEach(transformation => {
            const pole = world.pole(point(-radius, -radius));
            const rail = world.arcRail(pole, spacing / 2 - 50, 15, 0, -PI * 3 / 2);

            const elements = [pole, rail];

            for (let x = -radius + spacing ; x <= radius - spacing ; x += spacing) {
                const pole = world.pole(point(x, -radius));
                const rail = world.arcRail(pole, spacing / 2 - 50, 10, 0, -PI);
                elements.push(pole);
                elements.push(rail);
            }

            world.addFeature(elements, transformation);

            world.pole(point(pole.x, -pole.y));
            world.arcRail(point(pole.x, -pole.y), spacing / 2 - 50, 15, 0, PI * 3 / 2);
        });

        // Two kickers facing each other
        [
            translate(800, -100),
        ].forEach(transformation => {
            world.addFeature([
                world.kicker(point(-300, 0), 0),
                world.kicker(point(300, 0), PI),
            ], transformation);
        });

        // Two kickers and a rail in between
        [
            translate(1800, -2000),
            // translate(-700, )
        ].forEach(transformation => {
            world.addFeature([
                world.kicker(point(-600, 0), 0),
                world.kicker(point(600, 0), PI),
                world.rail([
                    point(-400, 0, 500),
                    point(400, 0, 500),
                ]),
            ], transformation);
        });

        // Two rail steps
        [
            translate(1500, -2450),
            multi(scale(-1, 1, 1), translate(2000, -2450)),
        ].forEach(transformation => {
            world.addFeature([
                world.rail([
                    point(-200, 0, 400),
                    point(200, 0, 400),
                ]),
                world.rail([
                    point(-800, 0, 200),
                    point(-400, 0, 200),
                ]),
            ], transformation);
        });

        // Kinked rail
        [
            translate(300, 1050),
            multi(scale(1, -1, 1), translate(100, -2400)),
            multi(translate(-1400, -300), scale(1, 1, 4)),
        ].forEach(transformation => {
            world.addFeature([
                world.rail([
                    point(-400, -50, 100),
                    point(-100, -50, 100),
                    point(100, 50, 100),
                    point(400, 50, 100),
                ]),
            ], transformation);
        });

        world.kicker(point(-700, -250), PI);

        // Kicker rail
        [
            multi(rotate(PI), translate(-1000, -800)),
            multi(translate(-1600, -800)),
        ].forEach(transformation => {
            world.addFeature([
                world.rail([
                    point(-400, 0, 100),
                    point(-100, 0, 100),
                    point(100, 0, 300),
                ]),
            ], transformation);
        });

        world.kicker(point(-200, -800), 0);

        // Zigzag rail
        [
            translate(-400, -1800),
            translate(-1200, -1600),
            translate(400, -2000),
        ].forEach(transformation => {
            world.addFeature([
                world.rail([
                    point(-300, 50, 100),
                    point(-100, -50, 100),
                    point(100, 50, 100),
                    point(300, -50, 100),
                ]),
            ], transformation);
        });

        // Kinked rail without last bit
        [
            multi(rotate(-PI / 4), translate(-2200, -300)),
            // multi(rotate(0), translate(-1400, -350), scale(1, 1, 3)),
        ].forEach(transformation => {
            world.addFeature([
                world.rail([
                    point(-400, -50, 100),
                    point(-100, -50, 100),
                    point(100, 50, 100),
                ]),
            ], transformation);
        });

        // Series of rails
        [
            translate(-1500, -2400),
        ].forEach(transformation => {
            world.addFeature([
                world.rail([
                    point(-200, 50, 200),
                    point(200, 50, 200),
                ]),
                world.rail([
                    point(-500, 50, 200),
                    point(-900, 50, 200),
                ]),
                world.rail([
                    point(500, 50, 200),
                    point(900, 50, 200),
                ]),
            ], transformation);
        });

        // Arced rail with a kicker on each end
        world.addFeature([
            world.arcRail(point(), 400, 10, PI / 2, PI * 3 / 2, 400),
            world.kicker(point(300, 400), PI),
            world.kicker(point(300, -400), PI),
        ], translate(800, -800));


        world.elements.forEach(element => {
            if (element.transformed) {
                world.addElement(element.transformed(x => point(-x.x, -x.y, x.z)));
            }
        });

        world.tape(point(-1300, -800, 600));
        world.tape(point(1800, -2000, 700));
        world.tape(point(1750, -2450, 700));
        world.tape(point(1400, 300, 600));
        world.tape(point(400, -800, 600));
    }

    setupDemoWorld() {
        this.demoWorld = null;
    }

    cycle(elapsed) {
        super.cycle(elapsed);
        if (this.demoWorld.age > 4) this.setupDemoWorld();

        if (this.timeLeft > 0) {
            this.timeLeft = max(0, this.timeLeft - elapsed);
        }

        if (this.timeLeft <= 0 && this.world.hero.landed && !this.ended) {
            this.ended = true;
            this.world.hero.speed = 0;
            this.world.hero.comboTracker.locked = true;
            this.world.hero.input = new EmptyInput();

            G.transition('#fff', 1);

            setTimeout(() => G.menu = new EndMenu(this.score), 2000);
        }
    }
}
