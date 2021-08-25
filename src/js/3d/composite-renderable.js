class CompositeRenderable extends Renderable {
    constructor(renderables, referencePoint) {
        super();

        this.renderables = renderables;
        this.referencePoint = referencePoint;
    }

    renderActual() {
        this.renderables.forEach(renderable => wrap(() => renderable.renderActual()));
    }

    renderShadow() {
        this.renderables.forEach(renderable => wrap(() => renderable.renderShadow()));
    }

    clone() {
        return new CompositeRenderable(this.renderables.map(renderable => renderable.clone()), this.referencePoint);
    }

    animateToGround(origin) {
        this.renderables.forEach(renderable => renderable.animateToGround(origin));
    }

    renderOnTopOfHero(hero) {
        return this.referencePoint.y > hero.y;
    }
}
