class FreeScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);

        this.timeLeft = 120;
        this.ended = false;

        this.score = 0;

        const spacing = 1000;
        const radius = spacing * 2;

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

        const pole = world.pole(point(-radius, -radius));
        world.arcRail(pole, spacing / 2 - 50, 15, 0, -PI * 3 / 2);

        for (let x = -radius + spacing ; x <= radius - spacing ; x += spacing) {
            const pole = world.pole(point(x, -radius));
            world.arcRail(pole, spacing / 2 - 50, 10, 0, -PI);
        }

        world.elements.forEach(element => {
            if (element.transformed) {
                transforms.forEach((transform) => {
                    world.addElement(element.transformed(transform));
                });
            }
        });

        // Two kickers facing each other
        // world.addFeature([
        //     world.kicker(point(-300, 0), 0),
        //     world.kicker(point(300, 0), PI),
        // ], identity);

        // Two kickers and a rail in between
        // world.addFeature([
        //     world.kicker(point(-600, 0), 0),
        //     world.kicker(point(600, 0), PI),
        //     world.rail([
        //         point(-400, 0, 500),
        //         point(400, 0, 500),
        //     ]),
        // ], identity);

        // Two rail steps
        // world.addFeature([
        //     world.rail([
        //         point(-200, 0, 400),
        //         point(200, 0, 400),
        //     ]),
        //     world.rail([
        //         point(-800, 0, 200),
        //         point(-400, 0, 200),
        //     ]),
        // ], identity);

        // Kinked rail
        // world.addFeature([
        //     world.rail([
        //         point(-400, -50, 200),
        //         point(-100, -50, 200),
        //         point(100, 50, 200),
        //         point(400, 50, 200),
        //     ]),
        // ], identity);

        // Kicker rail
        // world.addFeature([
        //     world.rail([
        //         point(-400, 0, 200),
        //         point(-100, 0, 200),
        //         point(100, 0, 500),
        //     ]),
        // ], identity);

        // Zigzag rail
        // world.addFeature([
        //     world.rail([
        //             point(-300, 50, 200),
        //             point(-100, -50, 200),
        //             point(100, 50, 200),
        //             point(300, -50, 200),
        //     ]),
        // ], translate(0, -100));

        // Kinked rail without last bit
        // world.addFeature([
        //     world.rail([
        //         point(-400, -50, 200),
        //         point(-100, -50, 200),
        //         point(100, 50, 200),
        //     ]),
        // ], multi(
        //     rotate(PI / 4),
        //     scale(2, 2, 3),
        // ));

        // Series of rails
        // world.addFeature([
        //     world.rail([
        //         point(-200, 50, 200),
        //         point(200, 50, 200),
        //     ]),
        //     world.rail([
        //         point(-500, 50, 200),
        //         point(-900, 50, 200),
        //     ]),
        //     world.rail([
        //         point(500, 50, 200),
        //         point(900, 50, 200),
        //     ]),
        // ], translate(0, -100));


        world.addFeature([
            world.arcRail(point(), 400, 10, PI / 2, PI * 3 / 2, 400),
            world.kicker(point(300, 400), PI),
            world.kicker(point(300, -400), PI),
            // world.rail([
            //     point(-500, 50, 200),
            //     point(-900, 50, 200),
            // ]),
            // world.rail([
            //     point(500, 50, 200),
            //     point(900, 50, 200),
            // ]),
        ], translate(0, -100));


        return;

        const poleMiddle = point(0, 0);
        const poleLeft = point(-800, 0);
        const poleRight = point(800, 0);

        world.kicker(point(poleLeft.x - 500, poleLeft.y - 200), PI / 2);
        world.kicker(point(poleLeft.x - 500, poleLeft.y + 200), -PI / 2);

        const poleXRadius = 200;

        world.pole(point(-600, 700));

        world.rail([
            point(poleMiddle.x - poleXRadius, poleMiddle.y + poleXRadius, 100),
            point(poleMiddle.x + poleXRadius, poleMiddle.y + poleXRadius, 100),
        ]);

        world.rail([
            point(poleMiddle.x - poleXRadius, poleMiddle.y - poleXRadius, 100),
            point(poleMiddle.x + poleXRadius, poleMiddle.y - poleXRadius, 100),
        ]);

        world.rail([
            point(poleLeft.x - poleXRadius, poleLeft.y + poleXRadius, 100),
            point(poleLeft.x + poleXRadius, poleLeft.y + poleXRadius, 100),
        ]);

        world.rail([
            point(poleLeft.x - poleXRadius, poleLeft.y - poleXRadius, 100),
            point(poleLeft.x + poleXRadius, poleLeft.y - poleXRadius, 100),
        ]);

        world.rail([
            point(poleRight.x - poleXRadius, poleRight.y + poleXRadius, 100),
            point(poleRight.x + poleXRadius, poleRight.y + poleXRadius, 100),
        ]);

        world.rail([
            point(poleRight.x - poleXRadius, poleRight.y - poleXRadius, 100),
            point(poleRight.x + poleXRadius, poleRight.y - poleXRadius, 100),
        ]);

        world.kicker(point(poleMiddle.x + 400, poleMiddle.y + 800), PI);
        world.kicker(point(poleMiddle.x - 400, poleMiddle.y + 800), 0);
        world.tape(point(poleMiddle.x, poleMiddle.y + 800, 600));


        world.kicker(point(poleMiddle.x, poleMiddle.y + 1400), PI);

        world.rail([
            point(poleMiddle.x - 300, poleMiddle.y + 1400, 400),
            point(poleMiddle.x - 800, poleMiddle.y + 1400, 400),
            point(poleMiddle.x - 1200, poleMiddle.y + 1000, 400),
        ]);
        world.tape(point(poleMiddle.x - 800, poleMiddle.y + 1400, 600));

        world.kicker(point(poleMiddle.x - 1400, poleMiddle.y + 800), PI / 4);

        world.rail([
            point(poleRight.x, poleRight.y + 1200, 100),
            point(poleRight.x, poleRight.y + 1600, 100),
            point(poleRight.x - 200, poleRight.y + 1800, 100),
            point(poleRight.x - 600, poleRight.y + 1800, 100),
            point(poleRight.x - 1000, poleRight.y + 1800, 400),
            point(poleRight.x - 1400, poleRight.y + 1800, 400),
        ])

        world.kicker(point(poleRight.x - 1800, poleRight.y + 1800), 0);

        world.rail([
            point(poleRight.x, poleRight.y + 1900, 100),
            point(poleRight.x, poleRight.y + 2200, 100),
            point(poleRight.x + 200, poleRight.y + 2400, 100),
        ]);

        world.pole(point(poleRight.x + 400, poleRight.y + 700));

        world.arcRail(point(poleRight.x + 400, poleRight.y + 850), 300, 6, 0, PI);
        world.arcRail(point(poleRight.x + 400, poleRight.y + 550), 300, 6, PI, TWO_PI);

        world.rail([
            point(poleRight.x + 200, poleRight.y + 1500, 100),
            point(poleRight.x + 500, poleRight.y + 1200, 100),
        ]);

        world.rail([
            point(-900, -600, 100),
            point(-600, -600, 100),
            point(-400, -700, 100),
            point(-100, -700, 100),
        ]);

        world.rail([
            point(900, -600, 100),
            point(600, -600, 100),
            point(400, -700, 100),
            point(100, -700, 100),
        ]);

        world.kicker(point(-250, -1100), 0);
        world.kicker(point(250, -1100), PI);
        world.tape(point(0, -1100, 500));

        world.pole(point(1200, -900));

        world.arcRail(
            point(1200, -900),
            300,
            8,
            PI / 2,
            -PI / 2,
        );

        world.arcRail(point(-1800, 1800), 300, 6, PI, 0, 200);
        world.arcRail(point(-2400, 1600), 300, 6, 0, -PI, 200);
        world.arcRail(point(-3000, 1800), 300, 6, PI, 0, 200);

        world.rail([point(-1800, 0, 100), point(-2200, 0, 100)]);
        world.rail([point(-2400, 0, 200), point(-2800, 0, 200)]);
        world.rail([point(-3000, 0, 300), point(-3400, 0, 300)]);
        world.arcRail(point(-3600, 400), 400, 6, -PI / 2, -PI * 3 / 2);
        world.rail([point(-1800, 800, 100), point(-2200, 800, 100)]);
        world.rail([point(-2400, 800, 200), point(-2800, 800, 200)]);
        world.rail([point(-3000, 800, 300), point(-3400, 800, 300)]);

        world.kicker(point(-3000, 400), 0);
        world.rail([point(-2800, 400, 400), point(-2200, 400, 400)]);
        world.kicker(point(-2000, 400), PI);
        world.tape(point(-2500, 400, 600));

        world.kicker(point(1500, 0), 0);
        world.rail([point(1800, 100, 400), point(2200, 100, 400), point(2400, 50, 400)]);
        world.rail([point(1800, -100, 400), point(2200, -100, 400), point(2400, -50, 400)]);

        world.rail([point(3400, 100, 400), point(3000, 100, 400), point(2600, 50, 400)]);
        world.rail([point(3400, -100, 400), point(3000, -100, 400), point(2600, -50, 400)]);
        world.kicker(point(3800, 0), PI);

        const pts = [];
        let lastPt;
        for (let k = 0 ; k < 1 ; k+= 0.05) {
            pts.push(lastPt = point(
                1800 + k * 2000,
                -400 + sin(k * PI * 2 * 3) * 100,
                400 + (1 - k) * 500,
            ));
        }
        world.rail(pts);

        world.kicker(point(lastPt.x + 200, lastPt.y), PI);

        world.tape(point(pts[0].x, pts[0].y, pts[0].z + 100));

        world.pole(poleMiddle);
        world.pole(poleLeft);
        world.pole(poleRight);

        world.hero.x = 100;
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
