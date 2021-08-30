class Arc extends Renderable {
    constructor(center, radius, fromAngle, toAngle, color = '#f00') {
        super();

        this.center = center;
        this.radius = radius;
        this.fromAngle = fromAngle;
        this.toAngle = toAngle;
        this.color = color;
    }

    renderArc(color, funcName) {
        const pt = this.center[funcName]();

        const { camera } = G.scene.world;
        if (!camera.contains(pt, this.radius + 80)) {
            return;
        }

        ss(color);
        R.lineWidth = 80;

        translate(pt.x, pt.y);
        rotate(PI / 10);
        scale(1, 0.3);
        beginPath();
        arc(0,0 , 150, this.fromAngle, this.toAngle);
        stroke();
    }

    renderActual() {
        this.renderArc(this.color, 'projectToActual');
    }

    renderShadow() {
        this.renderArc(SHADOW_COLOR, 'projectToShadow');
    }

    clone() {
        return new Arc(this.center, this.radius, this.fromAngle, this.toAngle, this.color);
    }

    renderOnTopOfHero(hero) {
        return this.center.y > hero.y;
    }
}
