class FreeScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);

        this.timeLeft = 120;

        this.score = 0;

        // const kicker = new Kicker();
        // kicker.y = 200;
        // world.addElement(kicker);
        //
        // const kickerLand = new Kicker();
        // kickerLand.y = 200;
        // kickerLand.x = 400;
        // kickerLand.angle = PI;
        // world.addElement(kickerLand);
        //
        // const kicker2 = new Kicker();
        // kicker2.y = -175;
        // kicker2.x = -350;
        // kicker2.angle = PI / 4;
        // // world.addElement(kicker2);
        //
        // const pole = new Pole();
        // pole.x = 100;
        // pole.y = -300;
        // world.addElement(pole);

        // const kicker = new Kicker();
        // kicker.y = 400;
        // // kicker2.x = -350;
        // // kicker2.angle = PI / 4;
        // world.addElement(kicker);

        // world.addElement(new Rail([
        //     new Point(400, 400, 100),
        //     new Point(800, 400, 100),
        //     new Point(1200, 400, 400),
        //     new Point(1600, 400, 400),
        //     new Point(1800, 500, 400),
        // ]));

        // const pole = new Pole();
        // pole.x = -400;
        // pole.y = 0;
        // world.addElement(pole);

        function arcRail(center, radius, count, fromAngle, toAngle) {
            const pts = [];
            for (let i = 0 ; i <= count ; i++) {
                const angle = (i / count) * (toAngle - fromAngle) + fromAngle;
                pts.push(new Point(
                    center.x + cos(angle) * radius,
                    center.y + sin(angle) * radius,
                    100,
                ));
            }
            world.addElement(new Rail(pts));
        }

        // arcRail(pole, 300, 5, 0, PI);

        function kickerCircle(center, radius, count, fromAngle, toAngle) {
            for (let i = 0 ; i <= count ; i++) {
                const angle = (i / count) * (toAngle - fromAngle) + fromAngle;

                const kicker = new Kicker();
                kicker.x = center.x + cos(angle) * radius;
                kicker.y = center.y + sin(angle) * radius;
                kicker.angle = angle + PI;
                world.addElement(kicker);
            }
        }

        // kickerCircle(new Point(-800, 400), 200, 3, 0, TWO_PI);

        // world.addElement(new Rail([
        //     new Point(0, 700, 100),
        //     new Point(300, 700, 100),
        // ]));
        //
        // world.addElement(new Rail([
        //     new Point(500, 700, 100),
        //     new Point(800, 700, 100),
        // ]));


        const poleMiddle = new Point(0, 0);
        const poleLeft = new Point(-800, 0);
        const poleRight = new Point(800, 0);

        function pole(pt) {
            const p = new Pole();
            p.x = pt.x;
            p.y = pt.y;
            world.addElement(p);
        }

        function kicker(pt, angle) {
            const k = new Kicker();
            k.x = pt.x;
            k.y = pt.y;
            k.angle = angle;
            world.addElement(k);
        }

        function rail(pts) {
            world.addElement(new Rail(pts));
        }

        function point(x, y, z) {
            return new Point(x, y, z);
        }

        pole(poleMiddle);
        pole(poleLeft);
        pole(poleRight);

        kicker(point(poleLeft.x - 500, poleLeft.y - 200), PI / 2);
        kicker(point(poleLeft.x - 500, poleLeft.y + 200), -PI / 2);

        const poleXRadius = 200;

        pole(point(-600, 700));

        rail([
            point(poleMiddle.x - poleXRadius, poleMiddle.y + poleXRadius, 100),
            point(poleMiddle.x + poleXRadius, poleMiddle.y + poleXRadius, 100),
        ]);

        rail([
            point(poleMiddle.x - poleXRadius, poleMiddle.y - poleXRadius, 100),
            point(poleMiddle.x + poleXRadius, poleMiddle.y - poleXRadius, 100),
        ]);

        rail([
            point(poleLeft.x - poleXRadius, poleLeft.y + poleXRadius, 100),
            point(poleLeft.x + poleXRadius, poleLeft.y + poleXRadius, 100),
        ]);

        rail([
            point(poleLeft.x - poleXRadius, poleLeft.y - poleXRadius, 100),
            point(poleLeft.x + poleXRadius, poleLeft.y - poleXRadius, 100),
        ]);

        rail([
            point(poleRight.x - poleXRadius, poleRight.y + poleXRadius, 100),
            point(poleRight.x + poleXRadius, poleRight.y + poleXRadius, 100),
        ]);

        rail([
            point(poleRight.x - poleXRadius, poleRight.y - poleXRadius, 100),
            point(poleRight.x + poleXRadius, poleRight.y - poleXRadius, 100),
        ]);

        kicker(point(poleMiddle.x + 200, poleMiddle.y + 800), PI);
        kicker(point(poleMiddle.x - 200, poleMiddle.y + 800), 0);
        kicker(point(poleMiddle.x, poleMiddle.y + 1000), -PI / 2);


        kicker(point(poleMiddle.x, poleMiddle.y + 1400), PI);

        rail([
            point(poleMiddle.x - 300, poleMiddle.y + 1400, 400),
            point(poleMiddle.x - 800, poleMiddle.y + 1400, 400),
            point(poleMiddle.x - 1000, poleMiddle.y + 1200, 400),
            point(poleMiddle.x - 1000, poleMiddle.y + 800, 400),
        ]);

        kicker(point(poleMiddle.x - 1200, poleMiddle.y + 1000), PI / 4);

        rail([
            point(poleRight.x, poleRight.y + 1200, 100),
            point(poleRight.x, poleRight.y + 1600, 100),
            point(poleRight.x - 200, poleRight.y + 1800, 100),
            point(poleRight.x - 600, poleRight.y + 1800, 100),
            point(poleRight.x - 1000, poleRight.y + 1800, 400),
            point(poleRight.x - 1400, poleRight.y + 1800, 400),
        ])

        kicker(point(poleRight.x - 1800, poleRight.y + 1800), 0);

        rail([
            point(poleRight.x, poleRight.y + 1900, 100),
            point(poleRight.x, poleRight.y + 2200, 100),
            point(poleRight.x + 200, poleRight.y + 2400, 100),
        ]);

        pole(point(poleRight.x + 400, poleRight.y + 700));

        arcRail(point(poleRight.x + 400, poleRight.y + 800), 300, 6, 0, PI);
        arcRail(point(poleRight.x + 400, poleRight.y + 600), 300, 6, PI, TWO_PI);

        rail([
            point(poleRight.x + 200, poleRight.y + 1500, 100),
            point(poleRight.x + 500, poleRight.y + 1200, 100),
        ]);

        rail([
            point(-900, -600, 100),
            point(-600, -600, 100),
            point(-400, -700, 100),
            point(-100, -700, 100),
        ]);

        rail([
            point(900, -600, 100),
            point(600, -600, 100),
            point(400, -700, 100),
            point(100, -700, 100),
        ]);

        kicker(point(-250, -1100), 0);
        kicker(point(250, -1100), PI);

        pole(point(1200, -900));

        arcRail(
            point(1200, -900),
            300,
            8,
            PI / 2,
            -PI / 2,
        );

        arcRail(point(-1800, 1800), 300, 6, PI, 0);
        arcRail(point(-2200, 1400), 300, 6, PI / 2, PI * 3 / 2);

        world.hero.x = 100;

        return;

        // function kicker(fromPoint, toPoint) {
        //     const rotated = rotatePoint(fromPoint);
        //     const rotatedTo = rotatePoint(toPoint);
        //
        //     console.log(rotated, rotatedTo);
        //
        //
        //     console.log(atan2(toPoint.y - fromPoint.y, toPoint.x - fromPoint.x) / PI * 180);
        //     console.log(atan2(rotated.y - rotatedTo.y, rotated.x - rotatedTo.x) / PI * 180);
        //
        //     const kicker = new Kicker();
        //     kicker.x = rotated.x;
        //     kicker.y = rotated.y;
        //     kicker.angle = atan2(rotatedTo.y - rotated.y, rotatedTo.x - rotated.x);
        //     // kicker.angle = PI / 4;
        //     world.addElement(kicker);
        //
        //     // world.addElement(new Rail([rotated, rotatedTo]));
        //
        //     // const poleFrom = new Pole();
        //     // poleFrom.x = rotated.x;
        //     // poleFrom.y = rotated.y;
        //     // world.addElement(poleFrom);
        //     //
        //     // const pole = new Pole();
        //     // pole.x = rotatedTo.x;
        //     // pole.y = rotatedTo.y;
        //     // world.addElement(pole);
        // }

        rail([
            new Point(100, 0, 200),
            new Point(600, 0, 200),
        ]);

        rail([
            new Point(800, 0, 200),
            new Point(1200, 0, 200),
        ]);

        kicker(new Point(-300, -300), new Point(400, 0));
        // kicker(new Point(350, -200), new Point(350, 200));

        return;

        world.addElement(new Rail([
            new Point(400, 400, 200),
            new Point(800, 400, 200),
            new Point(1200, 400, 400),
            new Point(1600, 400, 400),
            new Point(1800, 500, 400),
        ]));
        //
        // world.addElement(new Rail([
        //     new Point(-200, -400, 200),
        //     new Point(-800, -400, 200),
        //     new Point(-1200, -600, 200),
        // ]));


        for (let z = 100 ; z < 500 ; z += 150) {
            world.addElement(new Rail([
                new Point(-200, 0, z),
                new Point(0, -200 * 0.4, z),
            ]));
        }
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
    }
}
