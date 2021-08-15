class Sphere {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    renderActual() {
        R.fillStyle = '#f00';
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
}
