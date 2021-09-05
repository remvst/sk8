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
        this.bottom = this.newPoint();
        this.tapeCenter = this.newPoint();

        this.renderables = [
            segment(this.bottom, this.tapeCenter, 'rgba(255,255,255,0.2)', 2),
            new Plane([this.leftTop, this.leftBottom, this.rightBottom, this.rightTop], '#000'),
            sphere(this.sphereLeft, 12, COLOR_WHITE),
            sphere(this.sphereRight, 12, COLOR_WHITE),
        ];
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (dist(this, this.world.hero) < 100 && abs(this.z - (this.world.hero.z + 100)) < 150) {
            this.world.removeElement(this);

            this.world.hero.comboTracker.checkAllChallenges();

            pickupSound();
            for (let i = 0 ; i < 50 ; i++) {
                const angle = random() * TWO_PI;
                const distance = rnd(50, 100);
                this.world.particle({
                    'size': [20, -10],
                    'color': COLOR_WHITE,
                    'duration': rnd(0.4, 0.8),
                    'x': [this.x + rnd(-20, 20), cos(angle) * distance],
                    'y': [this.y + rnd(-20, 20), sin(angle) * distance],
                    'z': [this.z, 0],
                    'easing': easeOutCirc,
                });
            }
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

        this.tapeCenter.set(this.x, this.y, this.z);
        this.bottom.set(this.x, this.y, 0);
    }
}
