class Sphere {
    constructor(center, radius, color = '#f00') {
        this.center = center;
        this.radius = radius;
        this.color = color;
    }

    renderActual() {
        R.fillStyle = this.color;
        beginPath();
        arc(this.center.projectToActual().x, this.center.projectToActual().y, this.radius, 0, Math.PI * 2);
        fill();
    }

    renderShadow() {
        R.fillStyle = 'rgba(0, 0, 0, 0.5)';
        beginPath();
        arc(this.center.projectToShadow().x, this.center.projectToShadow().y, this.radius, 0, Math.PI * 2);
        fill();
    }

    get zIndex() {
        return this.center.zIndex;
    }
}
