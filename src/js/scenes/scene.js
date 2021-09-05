class Scene {
    constructor() {
        this.hud = new HUD(this);
        this.score = Number.MIN_SAFE_INTEGER;
        this.timeLeft = -1;
        this.completionAge = -1;
        this.completionActionCount = 0;
        this.requiredCompletionActionCount = 1;

        this.previousRoundedTimeLeft = 0;
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
        this.demoWorld.backgroundColor = '#000';
        this.demoWorld.addElement(new Hero(new EmptyInput()));
        this.setupWorld(this.demoWorld);
    }

    completionMessage() {
        return pick([
            nomangle('Nice!'),
            nomangle('Perfect!'),
            nomangle('You\'re a natural!'),
            nomangle('Sick!'),
        ]);
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

        setGrinding(hero && hero.input.userControlled && hero.grinding);

        if (!hero || hero.bailed) {
            this.didTryCompletingAction = false;
        } else {
            this.didTryCompletingAction = this.didTryCompletingAction || this.isPerformingCompletingAction(hero);

            if (this.completionAge < 0 && hero.landed && this.didTryCompletingAction && !this.completed) {
                this.completionActionCount++;
                this.didTryCompletingAction = false;

                if (this.requiredCompletionActionCount > 1) {
                    this.hud.showWorldMessage(this.completionActionCount + '/' + this.requiredCompletionActionCount);
                }

                if (this.completionActionCount >= this.requiredCompletionActionCount) {
                    this.completionAge = this.age + this.completionDelay();
                    this.hud.setPermanentMessage(this.completionMessage());
                }
            }
        }

        if (this.completionAge > 0 && this.age > this.completionAge) {
            this.proceed();
        }

        const roundedTimeLeft = floor(this.timeLeft);
        if (between(0, this.timeLeft, 15) && roundedTimeLeft != this.previousRoundedTimeLeft) {
            this.previousRoundedTimeLeft = roundedTimeLeft;
            tickSound();
        }
        this.previousRoundedTimeLeft = roundedTimeLeft;
    }

    render() {
        this.world.render();

        wrap(() => {
            if (!this.demoWorld) return;

            translate(
                evaluate(CANVAS_WIDTH - 50 - CANVAS_WIDTH * DEMO_SCALE),
                50,
            );
            fs(COLOR_WHITE);
            fr(-2, -2, evaluate(CANVAS_WIDTH * DEMO_SCALE + 4), evaluate(CANVAS_HEIGHT * DEMO_SCALE + 4));

            scale(DEMO_SCALE, DEMO_SCALE);
            beginPath();
            rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            clip();
            this.demoWorld.render();

            if (this.age % 1 > 0.5) {
                R.font = nomangle('72pt Impact');
                R.textAlign = nomangle('center');
                R.textBaseline = nomangle('middle');
                fillText(nomangle('DEMO'), evaluate(CANVAS_WIDTH / 2), 80);
            }
        });

        const { hero } = this.world;
        if (hero && !G.menu) {
            wrap(() => {
                if (!hero.landed || !hero.input.userControlled) return;

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
