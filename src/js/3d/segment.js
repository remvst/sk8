class Segment extends Renderable {
    constructor(p1, p2, color = '#f00', thickness = 2) {
        super();

        this.p1 = p1;
        this.p2 = p2;
        this.color = color;
        this.thickness = thickness;
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

    get zIndex() {
        return min(this.p1.zIndex, this.p2.zIndex);
    }

    clone() {
        return new Segment(this.p1.clone(), this.p2.clone(), this.color, this.thickness);
    }

    animateToGround(origin) {
        this.makePointsFall([this.p1, this.p2], origin);
    }
}
