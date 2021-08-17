class DebugRenderable extends Renderable {

    constructor(renderFunc) {
        super();
        this.renderFunc = renderFunc;
    }

    renderActual() {
        this.renderFunc();
    }

    renderShadow() {

    }
}
