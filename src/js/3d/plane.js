class Plane extends Renderable {
    constructor(points, color = '#00f') {
        super();
        this.points = points;
        this.color = color;

        this.segments = this.points.map((x, i) => {
            return segment(
                x,
                points[(i + 1) % points.length],
            );
        });
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

    clone() {
        return new Plane(
            this.points.map(point => point.clone()),
            this.color,
        );
    }

    animateToGround(origin) {
        this.makePointsFall(this.points, origin);
    }

    renderOnTopOfHero(hero) {
        for (const segment of this.segments) {
            if (!segment.renderOnTopOfHero(hero)) {
                return false;
            }
        }

        return true;
    }
}
