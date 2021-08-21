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

        const kicker = new Kicker();
        kicker.y = 400;
        // kicker2.x = -350;
        // kicker2.angle = PI / 4;
        world.addElement(kicker);

        world.addElement(new Rail([
            new Point(400, 400, 100),
            new Point(800, 400, 100),
            new Point(1200, 400, 400),
            new Point(1600, 400, 400),
            new Point(1800, 500, 400),
        ]));

        return;

        function rotatePoint(point) {
            const initialAngleToOrigin = atan2(point.y, point.x);
            const distance = distP(0, 0, point.x, point.y);
            const newAngle = initialAngleToOrigin + PI / 4;
            return new Point(
                cos(newAngle) * distance,
                sin(newAngle) * distance * 0.4,
                point.z,
            );
        }

        function rail(points) {
            world.addElement(new Rail(points.map(rotatePoint)));
        }

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
