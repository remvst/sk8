class FreeScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);

        this.timeLeft = 120;
        this.ended = false;

        this.score = 0;

        const poleMiddle = point(0, 0);
        const poleLeft = point(-800, 0);
        const poleRight = point(800, 0);

        world.pole(poleMiddle);
        world.pole(poleLeft);
        world.pole(poleRight);

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

        world.kicker(point(poleMiddle.x + 200, poleMiddle.y + 800), PI);
        world.kicker(point(poleMiddle.x - 200, poleMiddle.y + 800), 0);
        world.kicker(point(poleMiddle.x, poleMiddle.y + 1000), -PI / 2);


        world.kicker(point(poleMiddle.x, poleMiddle.y + 1400), PI);

        world.rail([
            point(poleMiddle.x - 300, poleMiddle.y + 1400, 400),
            point(poleMiddle.x - 800, poleMiddle.y + 1400, 400),
            point(poleMiddle.x - 1000, poleMiddle.y + 1200, 400),
            point(poleMiddle.x - 1000, poleMiddle.y + 800, 400),
        ]);

        world.kicker(point(poleMiddle.x - 1200, poleMiddle.y + 1000), PI / 4);

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

        world.arcRail(point(poleRight.x + 400, poleRight.y + 800), 300, 6, 0, PI);
        world.arcRail(point(poleRight.x + 400, poleRight.y + 600), 300, 6, PI, TWO_PI);

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

        world.pole(point(1200, -900));

        world.arcRail(
            point(1200, -900),
            300,
            8,
            PI / 2,
            -PI / 2,
        );

        world.arcRail(point(-1800, 1800), 300, 6, PI, 0);
        world.arcRail(point(-2200, 1400), 300, 6, PI / 2, PI * 3 / 2);

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
            this.world.hero.comboTracker.locked = true;
            this.world.hero.input = new EmptyInput();

            setTimeout(() => G.menu = new EndMenu(this.score), 2000);
        }
    }
}
