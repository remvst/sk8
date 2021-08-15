class Hero extends Element {

    constructor() {
        super();
        this.velocityZ = 0;

        this.leftFoot = this.newPoint();
        this.rightFoot = this.newPoint();
        this.hips = this.newPoint();
        this.shoulders = this.newPoint();
        this.leftHand = this.newPoint();
        this.rightHand = this.newPoint();
        this.headCenter = this.newPoint();

        this.boardStartTop = this.newPoint();
        this.boardStartBottom = this.newPoint();
        this.boardEndBottom = this.newPoint();
        this.boardEndTop = this.newPoint();

        this.squatting = false;
        this.grinding = false;

        this.renderables = [
            // Board
            new Segment(this.boardEndBottom, this.boardEndTop),
            new Segment(this.boardStartBottom, this.boardStartTop),
            new Segment(this.boardStartBottom, this.boardEndBottom),
            new Segment(this.boardStartTop, this.boardEndTop),

            // Character
            new Segment(this.leftFoot, this.hips),
            new Segment(this.rightFoot, this.hips),
            new Segment(this.hips, this.shoulders),
            new Segment(this.shoulders, this.leftHand),
            new Segment(this.shoulders, this.rightHand),
            new Sphere(this.headCenter, 5),
        ]

    }

    updateRenderables() {

        this.resetPoints();

        this.leftFoot.set( -10, 0, 0);
        this.rightFoot.set(10, 0, 0);
        this.hips.set(0, 0, 50);
        this.shoulders.set(0, 0, 100);
        this.leftHand.set(-10, 0, 50);
        this.rightHand.set(10, 0, 50);
        this.headCenter.set(0, 0, 120);

        const anglePlus90 = this.angle + PI / 2;

        this.adjustPoints();

        this.adjustFootPosition(this.leftFoot);
        this.adjustFootPosition(this.rightFoot);

        const footDistance = dist(this.leftFoot, this.rightFoot);
        const slope = (this.rightFoot.z - this.leftFoot.z) / footDistance;

        this.boardStartTop.set(
            this.leftFoot.x - Math.cos(this.angle) * 20 - Math.cos(anglePlus90) * 10,
            this.leftFoot.y - Math.sin(this.angle) * 20 - Math.sin(anglePlus90) * 10,
            this.leftFoot.z - slope * 20,
        );
        this.boardStartBottom.set(
            this.leftFoot.x - Math.cos(this.angle) * 20 + Math.cos(anglePlus90) * 10,
            this.leftFoot.y - Math.sin(this.angle) * 20 + Math.sin(anglePlus90) * 10,
            this.leftFoot.z - slope * 20,
        );
        this.boardEndBottom.set(
            this.rightFoot.x + Math.cos(this.angle) * 20 + Math.cos(anglePlus90) * 10,
            this.rightFoot.y + Math.sin(this.angle) * 20 + Math.sin(anglePlus90) * 10,
            this.rightFoot.z + slope * 20,
        );
        this.boardEndTop.set(
            this.rightFoot.x + Math.cos(this.angle) * 20 - Math.cos(anglePlus90) * 10,
            this.rightFoot.y + Math.sin(this.angle) * 20 - Math.sin(anglePlus90) * 10,
            this.rightFoot.z + slope * 20,
        );
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        this.velocityZ -= elapsed * 10;
        this.z = max(0, this.z + this.velocityZ);

        this.angle = atan2(this.world.mousePosition.y - this.y, this.world.mousePosition.x - this.x);

        if (this.z === 0) this.velocityZ = 0;

        if (MOUSE_IS_DOWN || true) {
            this.x += elapsed * cos(this.angle) * 100;
            this.y += elapsed * sin(this.angle) * 100;
        }

        if (this.shouldFall()) {
            // TODO
            // console.log('ya should fall');
        }

        const squatting = MOUSE_IS_DOWN;
        if (this.squatting && !squatting) {
            this.jump();
        }
        this.squatting = squatting;
    }

    adjustFootPosition(foot) {
        const kicker = this.world.elements.filter(element => element instanceof Kicker && element.contains(foot))[0];
        if (kicker) {
            const relative = kicker.relativePosition(foot);
            const progress = 1 - (kicker.radius - relative.x) / kicker.length;
            foot.z = Math.max(foot.z, progress * kicker.height);
        }
    }

    jump() {
        this.velocityZ = 5;
        this.grinding = false;
    }

    shouldFall() {
        const footDistance = dist(this.leftFoot, this.rightFoot);
        const slope = (this.rightFoot.z - this.leftFoot.z) / footDistance;
        if (abs(slope > 2)) {
            return true;
        }

        let collidesWithRail = false;

        for (const rail of this.world.elements) {
            if (rail instanceof Rail) {
                const collides = rail.collides(this);
                if (collides) {
                    collidesWithRail = true;

                    if (!this.grinding) {
                        if (this.z <= collides.positionOnRail.z) {
                            if (this.previous.z >= collides.positionOnRail.z) {
                                this.grinding = true;
                                console.log('we grind now!');
                            } else {
                                return true;
                            }
                        }
                    }

                    if (this.grinding) {
                        this.x = collides.positionOnRail.x;
                        this.y = collides.positionOnRail.y;
                        this.z = collides.positionOnRail.z;

                        this.velocityZ = 0;
                    }
                }
            }
        }

        if (!collidesWithRail && this.grinding) {
            console.log('stop grinding');
            this.grinding = false;
        }
    }
}
