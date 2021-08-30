class Sphere extends Renderable {
    constructor(center, radius, color = '#f00') {
        super();

        this.center = center;
        this.radius = radius;
        this.color = color;
    }

    renderSphere(color, funcName) {
        const pt = this.center[funcName]();

        const { camera } = G.scene.world;
        if (!camera.contains(pt, this.radius)) {
            return;
        }

        fs(color);
        beginPath();
        arc(pt.x, pt.y, this.radius, 0, TWO_PI);
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

    renderOnTopOfHero(hero) {
        return this.center.y > hero.y;
    }
}
