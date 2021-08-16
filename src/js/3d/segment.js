class Segment extends Renderable {
    constructor(p1, p2, color = '#f00', thickness = 2) {
        super();

        this.p1 = p1;
        this.p2 = p2;
        this.color = color;
        this.thickness = thickness;
    }

    renderActual() {
        R.lineWidth = this.thickness;
        R.strokeStyle = this.color;
        // globalAlpha = 1;
        beginPath();
        moveTo(this.p1.projectToActual().x, this.p1.projectToActual().y);
        lineTo(this.p2.projectToActual().x, this.p2.projectToActual().y);
        stroke();
    }

    renderShadow() {
        R.lineWidth = this.thickness;
        R.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        // globalAlpha = 0.5;
        // R.globalCompositeOperation = 'darken';
        beginPath();
        moveTo(this.p1.projectToShadow().x, this.p1.projectToShadow().y);
        lineTo(this.p2.projectToShadow().x, this.p2.projectToShadow().y);
        stroke();
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
