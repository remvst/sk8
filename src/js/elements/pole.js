class Pole extends Element {

    constructor() {
        super();

        this.base = this.newPoint();
        this.topPoint = this.newPoint();

            // Link to ground
        this.renderables = [new CompositeRenderable([new Segment(
            this.base,
            this.topPoint,
            '#eee',
            40
        ), new Arc(
            this.topPoint,
            150,
            PI,
            0,
            '#fff',
        ), new Sphere(
            this.topPoint,
            100,
            '#ccc',
        ), new Arc(
            this.topPoint,
            150,
            0,
            PI,
            '#fff',
        )], this.base)];
    }

    transformed(transform) {
        const pt = transform(point(this.x, this.y));

        const pole = new Pole();
        pole.x = pt.x;
        pole.y = pt.y;
        return pole;
    }

    updateRenderables() {
        this.base.set(this.x, this.y, 0);
        this.topPoint.set(this.x, this.y, 800);
    }

    collides(hero) {
        return distP(hero.x, hero.y, this.x, this.y) < 50;
    }
}
