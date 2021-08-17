class World {
    constructor() {
        this.elements = [];
        this.particles = [];

        this.camera = new Camera();

        this.mousePosition = new Point();

        this.addElement(this.simulatedHero = new SimulatedDraggable());

        this.addElement(new Hero(new Input()));

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
            new Point(-200, -400, 200),
            new Point(-800, -400, 200),
            new Point(-1200, -600, 200),
        ]));
    }

    addElement(element) {
        if (element instanceof Hero) {
            this.hero = element;
            this.simulatedHero.hero = element;
            this.camera.followedTarget = element;
        }

        element.world = this;
        this.elements.push(element);
    }

    removeElement(element) {
        if (element instanceof Hero) {
            this.simulatedHero.hero = null;
            this.hero = null;
        }

        remove(this.elements, element);
    }

    cycle(elapsed) {
        // this.mousePosition.set(MOUSE_POSITION.x + G.camera.x, MOUSE_POSITION.y + G.camera.y);
        this.elements.forEach(e => e.cycle(elapsed));
        this.camera.cycle(elapsed);
    }

    renderRenderables(list, condition) {
        list.forEach(renderable => wrap(() => {
            if (condition(renderable)) renderable.renderActual();
        }));
    }

    render() {
        this.elements.forEach(e => e.prerender());

        wrap(() => {
            translate(-this.camera.x, -this.camera.y);

            const before = [];
            const after = [];
            for (const element of this.elements) {
                for (const renderable of element.renderables) {
                    wrap(() => renderable.renderShadow());

                    if (this.hero && renderable === this.hero.renderables[0] || !renderable.visible) {
                        continue;
                    }

                    if (!this.hero || !renderable.renderOnTopOfHero(this.hero)) {
                        before.push(renderable);
                    } else {
                        after.push(renderable);
                    }
                }
            }

            before.forEach(renderable => wrap(() => renderable.renderActual()));
            this.particles.forEach(particle => wrap(() => particle.render()));
            if (this.hero) wrap(() => this.hero.renderables[0].renderActual());
            after.forEach(renderable => wrap(() => renderable.renderActual()));
        });

        wrap(() => {
            if (!this.hero.landed) return;

            translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

            R.fillStyle = '#fff';
            R.globalAlpha = 0.5;
            beginPath();
            arc(MOVEMENT_TARGET_DIRECTION.x, MOVEMENT_TARGET_DIRECTION.y, 20, 0, PI * 2);
            fill();
        });
    }

    particle(properties) {
        let particle;
        properties.onFinish = () => remove(this.particles, particle);
        this.particles.push(particle = new Particle(properties));
    }
}
