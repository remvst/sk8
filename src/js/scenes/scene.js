class Scene {
    constructor() {
        this.hud = new HUD(this);
        this.score = Number.MIN_SAFE_INTEGER;
        this.timeLeft = -1;
        this.completionAge = -1;
    }

    isPerformingCompletingAction(hero) {
        return false;
    }

    proceed() {
        if (this.nextScene) {
            G.startScene(this.nextScene);
        }
    }

    restart() {
        this.age = 0;
        this.demoDuration = 5;
        this.setupActualWorld();
        this.setupDemoWorld();
    }

    setupWorld(world) {
        world.scene = this;
    }

    setupActualWorld() {
        this.world = new World();
        this.world.addElement(new Hero(new Input()));
        this.setupWorld(this.world);
    }

    setupDemoWorld() {
        this.demoWorld = new World();
        this.demoWorld.scene = this;
        this.demoWorld.addElement(new Hero(new EmptyInput()));
        this.setupWorld(this.demoWorld);
    }

    completionMessage() {
        return nomangle('Nice!');
    }

    completionDelay() {
        return 2;
    }

    cycle(elapsed) {
        this.age += elapsed;
        this.world.cycle(elapsed);
        if (this.demoWorld) {
            this.demoWorld.cycle(elapsed);
            if (this.demoWorld.age > this.demoDuration) {
                this.setupDemoWorld();
            }
        }
        this.hud.cycle(elapsed);

        const { hero } = this.world;
        if (!hero) return;

        if (hero && hero.input.userControlled) {
            MOUSE_POSITION.x = evaluate(CANVAS_WIDTH / 2);
            MOUSE_POSITION.y = evaluate(CANVAS_HEIGHT / 2);
        }

        if (!hero || hero.bailed) {
            this.didTryCompletingAction = false;
        } else {
            this.didTryCompletingAction = this.didTryCompletingAction || this.isPerformingCompletingAction(hero);

            if (this.completionAge < 0 && hero.landed && this.didTryCompletingAction && !this.completed) {
                this.completionAge = this.age + this.completionDelay();
                this.hud.setPermanentMessage(this.completionMessage());
            }
        }

        if (this.completionAge > 0 && this.age > this.completionAge) {
            this.proceed();
        }
    }

    render() {
        wrap(() => {
            fs('#170e65');
            fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        });

        this.world.render();

        wrap(() => {
            if (!this.demoWorld) return;

            translate(
                evaluate(CANVAS_WIDTH - 50 - CANVAS_WIDTH * DEMO_SCALE),
                50,
            );
            fs('#fff');
            fr(-2, -2, evaluate(CANVAS_WIDTH * DEMO_SCALE + 4), evaluate(CANVAS_HEIGHT * DEMO_SCALE + 4));

            scale(DEMO_SCALE, DEMO_SCALE);
            fs('#000');
            beginPath();
            rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            fill();
            clip();
            this.demoWorld.render();

            fs('#000');
            fr(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50);

            fs('#fff');
            fr(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH * this.demoWorld.age / this.demoDuration, 50);

            if (this.age % 1 > 0.5) {
                R.font = nomangle('72pt Impact');
                R.textAlign = 'center';
                R.textBaseline = 'middle';
                fillText(nomangle('DEMO'), CANVAS_WIDTH / 2, 80);
            }
        });

        const { hero } = this.world;
        if (hero && hero.input.userControlled) {
            wrap(() => {
                if (!hero.landed) return;

                translate(
                    CANVAS_WIDTH / 2 + MOVEMENT_TARGET_DIRECTION.x,
                    CANVAS_HEIGHT / 2 + MOVEMENT_TARGET_DIRECTION.y,
                );
                rotate(atan2(MOVEMENT_TARGET_DIRECTION.y, MOVEMENT_TARGET_DIRECTION.x));
                renderArrow();
            });
        }

        if (!G.menu) this.hud.render();
    }
}
