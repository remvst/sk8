class BalanceRenderable extends Renderable {

    constructor(referencePoint) {
        super();
        this.referencePoint = referencePoint;
        this.balance = 0;
    }

    renderActual() {
        R.lineWidth = 20;
        translate(this.referencePoint.projectToActual().x, this.referencePoint.projectToActual().y);
        rotate(-PI / 2);
        ss('#fff');
        beginPath();
        arc(0, 0, 200, -PI / 4, PI / 4);
        stroke();

        translate(cos(this.balance * PI / 4) * 200, sin(this.balance * PI / 4) * 200);
        beginPath();
        fs('#f00');
        moveTo(0, 0);
        lineTo(40, 20);
        lineTo(40, -20);
        fill();
    }

    renderShadow() {

    }

    animateToGround() {
        this.visible = false;
    }

    clone() {
        return this;
    }
}
