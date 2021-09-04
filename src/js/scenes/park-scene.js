class ParkScene extends Scene {

    constructor() {
        super();
        this.score = 0;
    }

    setupWorld(world) {
        super.setupWorld(world);

        const spacing = 1000;
        const radius = spacing * 3;

        const translateFeature = (x, y = 0, z = 0) => (pt) => point(pt.x + x, pt.y + y, pt.z + z);
        const scaleFeature = (x, y = 1, z = 1) => (pt) => point(pt.x * x, pt.y * y, pt.z * z);
        const rotateFeature = (rotation) => pt => {
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
            translateFeature(800, -100),
        ].forEach(transformation => {
            world.addFeature([
                world.kicker(point(-300, 0), 0),
                world.kicker(point(300, 0), PI),
            ], transformation);
        });

        // Two kickers and a rail in between
        [
            translateFeature(1800, -2000),
            // translateFeature(-700, )
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
            translateFeature(1500, -2450),
            multi(scaleFeature(-1, 1, 1), translateFeature(2000, -2450)),
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
            translateFeature(300, 1050),
            multi(scaleFeature(1, -1, 1), translateFeature(100, -2400)),
            multi(translateFeature(-1400, -300), scaleFeature(1, 1, 4)),
            multi(translateFeature(-2200, -1500)),
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
            multi(rotateFeature(PI), translateFeature(-1000, -800)),
            multi(translateFeature(-1600, -800)),
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
            translateFeature(-400, -1800),
            translateFeature(-1200, -1600),
            translateFeature(400, -2000),
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
            multi(rotateFeature(-PI / 4), translateFeature(-2200, -300)),
            // multi(rotateFeature(0), translateFeature(-1400, -350), scaleFeature(1, 1, 3)),
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
            translateFeature(-1500, -2400),
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
        ], translateFeature(800, -800));


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
}
