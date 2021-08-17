class ArrowRenderable extends Renderable {

    constructor(points) {
        super();
        this.points = points;
    }

    renderActual() {
        R.globalAlpha = 0.05;
        R.lineWidth = 30;
        R.lineCap = 'butt';
        fs('#fff');
        ss('#fff');

        beginPath();
        this.points.forEach(point => lineTo(point.x, point.y));
        stroke();

        const last = this.points[this.points.length - 1];
        const beforeLast = this.points[this.points.length - 2];

        translate(last.x, last.y);
        rotate(atan2(last.y - beforeLast.y, last.x - beforeLast.x));

        beginPath();
        moveTo(25, 0);
        lineTo(0, 25);
        lineTo(0, -25);
        fill();
    }

    renderShadow() {

    }
}
