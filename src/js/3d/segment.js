class Segment extends Renderable {
    constructor(p1, p2, color = '#f00', thickness = 2) {
        super();

        this.p1 = p1;
        this.p2 = p2;
        this.color = color;
        this.thickness = thickness;
    }

    renderSegment(color, funcName) {
        const p1 = this.p1[funcName]();
        const p2 = this.p2[funcName]();

        const { camera } = G.scene.world;
        if (!camera.contains(p1, this.thickness) && !camera.contains(p2, this.thickness)) {
            return;
        }

        R.lineWidth = this.thickness;
        ss(color);
        beginPath();
        moveTo(p1.x, p1.y);
        lineTo(p2.x, p2.y);
        stroke();
    }

    renderActual() {
        this.renderSegment(this.color, 'projectToActual');
    }

    renderShadow() {
        this.renderSegment(COLOR_SHADOW, 'projectToShadow');
    }

    clone() {
        return segment(this.p1.clone(), this.p2.clone(), this.color, this.thickness);
    }

    animateToGround(origin) {
        this.makePointsFall([this.p1, this.p2], origin);
    }

    renderOnTopOfHero(hero) {
        if (this.p1.x == this.p2.x) return hero.y < min(this.p1.y, this.p2.y);

        const positionOnSegment = point();
        const ratio = (hero.x - this.p1.x) / (this.p2.x - this.p1.x);
        positionOnSegment.x = hero.x;
        positionOnSegment.y = this.p1.y + ratio * (this.p2.y - this.p1.y);

        if (positionOnSegment.y > hero.y) {
            return true;
        }
    }
}

segment = (...args) => new Segment(...args);
