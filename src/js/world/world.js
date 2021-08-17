class World {
    constructor() {
        this.elements = [];
        this.renderables = [];

        this.camera = new Camera();

        this.mousePosition = new Point();

        this.addElement(this.simulatedHero = new SimulatedDraggable());

        this.addElement(new Hero());

        const kicker = new Kicker();
        kicker.y = 200;
        this.addElement(kicker);

        const kickerLand = new Kicker();
        kickerLand.y = 200;
        kickerLand.x = 400;
        kickerLand.angle = PI;
        this.addElement(kickerLand);

        const kicker2 = new Kicker();
        kicker2.y = -175;
        kicker2.x = -350;
        kicker2.angle = PI / 4;
        this.addElement(kicker2);

        this.addElement(new Rail([
            new Point(400, 400, 200),
            new Point(800, 400, 200),
            new Point(1200, 400, 400),
            new Point(1600, 400, 400),
            new Point(1800, 500, 400),
        ]));

        this.addElement(new Rail([
            new Point(-400, -400, 200),
            new Point(-800, -400, 200),
            new Point(-1200, -600, 200),
        ]));
    }

    addElement(element) {
        if (element instanceof Hero) {
            this.hero = element;
            this.simulatedHero.hero = element;
        }

        element.world = this;
        this.elements.push(element);

        // element.renderables.forEach((renderable) => {
        //     this.renderables.push(renderable);
        // });
    }

    removeElement(element) {
        if (element instanceof Hero) {
            this.simulatedHero.hero = null;
        }

        const index = this.elements.indexOf(element);
        if (index >= 0) this.elements.splice(index, 1);
    }

    cycle(elapsed) {
        // this.mousePosition.set(MOUSE_POSITION.x + G.camera.x, MOUSE_POSITION.y + G.camera.y);
        this.elements.forEach(e => e.cycle(elapsed));
        this.camera.cycle(elapsed);
    }

    sortRenderables() {
        // TODO can probably avoid sorting what's not visible

        this.elements.sort((a, b) => {
            return a.renderBefore(b) ? -1 : 1;
        });
        return;

        for (let i = 0 ; i < this.elements.length - 1 ; i++) {
            if (this.elements[i + 1].renderBefore(this.elements[i + 1])) {
                const z = this.elements[i];
                this.elements[i] = this.elements[i + 1];
                this.elements[i + 1] = z;
            }
        }
    }

    render() {
        this.elements.forEach(e => e.prerender());

        this.sortRenderables();

        wrap(() => {
            translate(-this.camera.x, -this.camera.y);

            this.elements.forEach(element => {
                element.renderables.forEach(renderable => {
                    if (renderable.visible) {
                        wrap(() => renderable.renderShadow());
                    }
                });
            });
            this.renderables.forEach(renderable => wrap(() => renderable.render()));

            this.elements.forEach(element => {
                element.renderables.forEach(renderable => {
                    if (renderable.visible) {
                        wrap(() => renderable.renderActual());
                    }
                });
            });
        });

        wrap(() => {

            wrap(() => {
                return;

                const hero = this.hero;
                if (!hero) return;

                translate(-this.camera.x, -this.camera.y);
                R.globalAlpha = 0.5;
                R.lineWidth = 30;
                R.lineCap = 'butt';
                fs('#fff');
                ss('#fff');

                this.simulatedHero.copy(hero);

                const simulationStep = 0.1;
                let previousX;
                let previousY;

                beginPath();
                moveTo(hero.x, hero.y);
                for (let i = 0 ; i < 0.5 ; i += simulationStep) {
                    previousX = this.simulatedHero.x;
                    previousY = this.simulatedHero.y;

                    this.simulatedHero.cycle(simulationStep);

                    // fillRect(this.simulatedHero.x, this.simulatedHero.y, 10, 10);
                    lineTo(this.simulatedHero.x, this.simulatedHero.y);
                }
                stroke();

                // const lastAngle = atan2(this.simulatedHero.y - previousY, this.simulatedHero.x - previousX);
                translate(this.simulatedHero.x, this.simulatedHero.y);
                rotate(atan2(this.simulatedHero.y - previousY, this.simulatedHero.x - previousX));

                beginPath();
                moveTo(50, 0);
                lineTo(0, 50);
                lineTo(0, -50);
                fill();
            });

            translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

            R.fillStyle = '#fff';
            beginPath();
            arc(MOVEMENT_TARGET_DIRECTION.x, MOVEMENT_TARGET_DIRECTION.y, 20, 0, PI * 2);
            fill();
        });
    }

    particle(properties) {
        let particle;
        properties.onFinish = () => remove(this.renderables, particle);
        this.renderables.push(particle = new Particle(properties));
    }
}
