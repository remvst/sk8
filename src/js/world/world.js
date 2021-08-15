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
    }

    cycle(elapsed) {
        this.mousePosition.set(MOUSE_POSITION.x + G.camera.x, MOUSE_POSITION.y + G.camera.y);
        this.elements.forEach(e => e.cycle(elapsed));
    }

    render() {
        // wrap(() => {
        //     fs('#f00');
        //     fr(this.mouse);
        // });

        this.elements.forEach(e => e.prerender());
        this.elements.forEach(e => e.renderShadow());
        this.elements.forEach(e => e.renderElement());
    }
}
