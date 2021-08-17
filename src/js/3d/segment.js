class Segment extends Renderable {
    constructor(p1, p2, color = '#f00', thickness = 2) {
        super();

        this.p1 = p1;
        this.p2 = p2;
        this.color = color;
        this.thickness = thickness;

        // this.min = new Point(
        //     min(p1.x, p2.x),
        //     min(p1.y, p2.y),
        //     min(p1.z, p2.z),
        // );
        // this.max = new Point(
        //     min(p1.x, p2.x),
        //     min(p1.y, p2.y),
        //     min(p1.z, p2.z),
        // );
    }

    renderSegment(color, funcName) {
        R.lineWidth = this.thickness;
        ss(color);
        beginPath();
        moveTo(this.p1[funcName]().x, this.p1[funcName]().y);
        lineTo(this.p2[funcName]().x, this.p2[funcName]().y);
        stroke();
    }

    renderActual() {
        this.renderSegment(this.color, 'projectToActual');
    }

    renderShadow() {
        this.renderSegment(SHADOW_COLOR, 'projectToShadow');
    }

    clone() {
        return new Segment(this.p1.clone(), this.p2.clone(), this.color, this.thickness);
    }

    animateToGround(origin) {
        this.makePointsFall([this.p1, this.p2], origin);
    }

    renderOnTopOfHero(hero) {
        if (this.p1.x == this.p2.x) return hero.y < min(this.p1.y, this.p2.y);


        const positionOnSegment = new Point();
        const ratio = (hero.x - this.p1.x) / (this.p2.x - this.p1.x);
        positionOnSegment.x = hero.x;
        positionOnSegment.y = this.p1.y + ratio * (this.p2.y - this.p1.y);

        if (positionOnSegment.y > hero.y) {
            return true;
        }
    }
}
