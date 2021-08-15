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

    get zIndex() {
        return Number.MAX_SAFE_INTEGER;
    }
}
