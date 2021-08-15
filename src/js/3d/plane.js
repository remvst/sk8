class Plane {
    constructor(points, color = '#00f') {
        this.points = points;
        this.color = color;
    }

    renderActual() {
        R.fillStyle = this.color;
        // globalAlpha = 1;
        beginPath();

        this.points.forEach(pt => {
            lineTo(pt.projectToActual().x, pt.projectToActual().y);
        });

        fill();
    }

    renderShadow() {
        R.fillStyle = 'rgba(0, 0, 0, 0.5)';
        // globalAlpha = 0.5;
        beginPath();

        this.points.forEach(pt => {
            lineTo(pt.projectToShadow().x, pt.projectToShadow().y);
        });

        fill();
    }
}
