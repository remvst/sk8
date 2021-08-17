class Plane extends Renderable {
    constructor(points, color = '#00f') {
        super();
        this.points = points;
        this.color = color;
    }

    renderPlane(color, funcName) {
        fs(color);
        beginPath();
        this.points.forEach(pt => lineTo(pt[funcName]().x, pt[funcName]().y));
        fill();
    }

    renderActual() {
        this.renderPlane(this.color, 'projectToActual');
    }

    renderShadow() {
        this.renderPlane(SHADOW_COLOR, 'projectToShadow');
    }

    get zIndex() {
        return this.points.reduce((acc, pt) => {
            return min(acc, pt.zIndex);
        }, Number.MAX_SAFE_INTEGER);
    }

    clone() {
        return new Plane(
            this.points.map(point => point.clone()),
            this.color,
        );
    }

    animateToGround(origin) {
        this.makePointsFall(this.points, origin);
    }
}
