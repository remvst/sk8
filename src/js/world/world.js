class World {
    constructor() {
        this.elements = [];
        this.renderables = [];

        this.mousePosition = new Point();

        const hero = new Hero();
        this.addElement(hero);

        const kicker = new Kicker();
        kicker.y = 200;
        this.addElement(kicker);

        const kicker2 = new Kicker();
        kicker2.y = -200;
        kicker2.angle = PI / 4;
        this.addElement(kicker2);
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

        for (let i = 0 ; i < this.renderables.length - 1 ; i++) {
            if (this.renderables[i].zIndex > this.renderables[i + 1].zIndex) {
                const z = this.renderables[i];
                this.renderables[i] = this.renderables[i + 1];
                this.renderables[i + 1] = z;
            }
        }
    }

    render() {
        this.sortRenderables();

        this.elements.forEach(e => e.prerender());

        this.renderables.forEach(renderable => renderable.renderShadow());
        this.renderables.forEach(renderable => renderable.renderActual());
    }
}
