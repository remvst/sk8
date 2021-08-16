class World {
    constructor() {
        this.elements = [];
        this.renderables = [];

        this.camera = new Camera();

        this.mousePosition = new Point();

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
        }

        element.world = this;
        this.elements.push(element);

        element.renderables.forEach((renderable) => {
            this.renderables.push(renderable);
        });
    }

    removeElement(element) {
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
                    wrap(() => {
                        renderable.renderShadow();
                    });
                });
            });

            this.elements.forEach(element => {
                element.renderables.forEach(renderable => {
                    wrap(() => {
                        renderable.renderActual();
                    });
                });
            });
        });
        // this.renderables.forEach(renderable => wrap(() => renderable.renderActual()));

        wrap(() => {
            translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            R.fillStyle = '#fff';
            beginPath();
            arc(MOVEMENT_TARGET_DIRECTION.x, MOVEMENT_TARGET_DIRECTION.y, 20, 0, PI * 2);
            fill();
        });
    }
}
