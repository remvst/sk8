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
            // new Segment(this.leftTop, this.leftBottom, '#fff', 8),
            // new Segment(this.rightTop, this.rightBottom, '#fff', 8),
            // // new Segment(this.leftTop, this.rightTop),
            // // new Segment(this.leftBottom, this.rightBottom),
            // new Segment(this.highTop, this.highBottom, '#fff', 8),
            // new Segment(this.leftTop, this.highTop, '#fff', 8),
            // new Segment(this.leftBottom, this.highBottom, '#fff', 8),
            // new Segment(this.highTop, this.rightTop, '#fff', 8),
            // new Segment(this.highBottom, this.rightBottom, '#fff', 8),

            new Plane([this.leftTop, this.leftBottom, this.rightBottom, this.rightTop], '#000'),
            new Sphere(this.sphereLeft, 12, '#fff'),
            new Sphere(this.sphereRight, 12, '#fff'),

            // new Disk(this.edgeCenter(), 10),
        ];
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (dist(this, this.world.hero) < 50 && abs(this.z - this.world.hero.z) < 100) {
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
