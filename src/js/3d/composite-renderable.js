class CompositeRenderable extends Renderable {
    constructor(renderables) {
        super();

        this.renderables = renderables;
    }

    renderActual() {
        this.renderables.forEach(renderable => renderable.renderActual());
    }

    renderShadow() {
        this.renderables.forEach(renderable => renderable.renderShadow());
    }

    clone() {
        return new CompositeRenderable(this.renderables.map(renderable => renderable.clone()));
    }

    animateToGround(origin) {
        this.renderables.forEach(renderable => renderable.animateToGround(origin));
    }
}
