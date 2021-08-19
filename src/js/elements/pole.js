class Pole extends Element {

    constructor(points) {
        super();

        this.base = this.newPoint();
        this.top = this.newPoint();

            // Link to ground
        this.renderables = [new Segment(
            this.base,
            this.top,
            '#eee',
            40
        ), new Arc(
            this.top,
            150,
            PI,
            0,
            '#fff',
        ), new Sphere(
            this.top,
            100,
            '#ccc',
        ), new Arc(
            this.top,
            150,
            0,
            PI,
            '#fff',
        )];
    }

    updateRenderables() {
        this.base.set(this.x, this.y, 0);
        this.top.set(this.x, this.y, 800);
    }

    collides(hero) {
        return distP(hero.x, hero.y, this.x, this.y) < 50;
    }
}
