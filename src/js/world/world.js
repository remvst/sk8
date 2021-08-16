class World {
    constructor() {
        this.elements = [];
        this.renderables = [];

        this.mousePosition = new Point();

        const hero = new Hero();
        this.hero = hero;
        this.addElement(hero);

        const kicker = new Kicker();
        kicker.y = 200;
        this.addElement(kicker);

        const kicker2 = new Kicker();
        kicker2.y = -175;
        kicker2.x = -350;
        kicker2.angle = PI / 4;
        this.addElement(kicker2);

        this.addElement(new Rail([
            new Point(400, 400, 200),
            new Point(800, 800, 200),
            new Point(1200, 400, 400),
            new Point(1600, 400, 400),
        ]));

        this.addElement(new Rail([
            new Point(-400, -400, 200),
            new Point(-800, -400, 200),
            new Point(-1200, -600, 200),
        ]));
    }

    addElement(element) {
        element.world = this;
        this.elements.push(element);

        element.renderables.forEach((renderable) => {
            this.renderables.push(renderable);
        });
    }

    cycle(elapsed) {
        this.mousePosition.set(MOUSE_POSITION.x + G.camera.x, MOUSE_POSITION.y + G.camera.y);
        this.elements.forEach(e => e.cycle(elapsed));
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
        // this.renderables.forEach(renderable => wrap(() => renderable.renderActual()));
    }
}
