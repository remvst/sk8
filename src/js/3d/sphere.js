class Sphere extends Renderable {
    constructor(center, radius, color = '#f00') {
        super();

        this.center = center;
        this.radius = radius;
        this.color = color;
    }

    renderSphere(color, funcName) {
        fs(color);
        beginPath();
        arc(this.center[funcName]().x, this.center[funcName]().y, this.radius, 0, Math.PI * 2);
        fill();
    }

    renderActual() {
        this.renderSphere(this.color, 'projectToActual');
    }

    renderShadow() {
        this.renderSphere(SHADOW_COLOR, 'projectToShadow');
    }

    clone() {
        return new Sphere(this.center, this.radius, this.color);
    }

    animateToGround(origin) {
        this.makePointsFall([this.center], origin);
    }
}
