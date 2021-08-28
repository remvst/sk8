class Tape extends Element {

    constructor() {
        super();

        this.radius = this.length / 2;

        this.leftTop = this.newPoint();
        this.leftBottom = this.newPoint();
        this.rightTop = this.newPoint();
        this.rightBottom = this.newPoint();
        this.sphereLeft = this.newPoint();
        this.sphereRight = this.newPoint();

        this.renderables = [
            new Plane([this.leftTop, this.leftBottom, this.rightBottom, this.rightTop], '#000'),
            new Sphere(this.sphereLeft, 12, '#fff'),
            new Sphere(this.sphereRight, 12, '#fff'),
        ];
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (dist(this, this.world.hero) < 100 && abs(this.z - (this.world.hero.z + 100)) < 150) {
            this.world.removeElement(this);

            pickupSound();

            this.world.hero.comboTracker.checkAllChallenges();
        }
    }

    updateRenderables() {
        const animationRatio = (Date.now() % 5000) / 5000;

        const radius = this.length / 2;

        this.leftBottom.set(-50, 0, 70);
        this.leftTop.set(-50, 0, -70);

        this.rightBottom.set(50, 0, 70);
        this.rightTop.set(50, 0, -70);

        this.sphereLeft.set(-25, 0, 0);
        this.sphereRight.set(25, 0, 0);

        this.adjustPoints();

        this.points.forEach(x => x.z += sin(G.clock * PI) * 50)
    }
}
