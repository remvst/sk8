class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    renderActual() {
        R.lineWidth = 2;
        R.strokeStyle = '#f00';
        // globalAlpha = 1;
        beginPath();
        moveTo(this.p1.projectToActual().x, this.p1.projectToActual().y);
        lineTo(this.p2.projectToActual().x, this.p2.projectToActual().y);
        stroke();
    }

    renderShadow() {
        R.lineWidth = 2;
        R.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        // globalAlpha = 0.5;
        beginPath();
        moveTo(this.p1.projectToShadow().x, this.p1.projectToShadow().y);
        lineTo(this.p2.projectToShadow().x, this.p2.projectToShadow().y);
        stroke();
    }
}
