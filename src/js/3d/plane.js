class Plane extends Renderable {
    constructor(points, color = '#00f') {
        super();
        this.points = points;
        this.color = color;

        this.segments = [];
        for (let i = 0 ; i < points.length ; i++) {
            const current = points[i];
            const next = points[(i + 1) % points.length];
            this.segments.push(new Segment(current, next));
        }
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

        let minY = 9999999;
        for (const point of this.points) {
            minY = min(minY, point.projectToActual().y);
        }

        if (minY < this.y) {
            return true;
        }
    }
}
