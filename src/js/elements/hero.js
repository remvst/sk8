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

        this.wheelStartTop = this.newPoint();
        this.wheelStartBottom = this.newPoint();
        this.wheelEndTop = this.newPoint();
        this.wheelEndBottom = this.newPoint();

        this.squatting = false;
        this.grinding = false;

        this.renderables = [
            // Board
            // new Segment(this.boardEndBottom, this.boardEndTop, '#f00', 8),
            // new Segment(this.boardStartBottom, this.boardStartTop, '#f00', 8),
            // new Segment(this.boardStartBottom, this.boardEndBottom, '#f00', 8),
            // new Segment(this.boardStartTop, this.boardEndTop, '#f00', 8),

            new Plane([this.boardEndBottom, this.boardEndTop, this.boardStartTop, this.boardStartBottom], '#000'),

            // Character
            new Segment(this.leftFoot, this.hips, '#000', 16),
            new Segment(this.rightFoot, this.hips, '#000', 16),
            new Segment(this.hips, this.shoulders, '#000', 16),
            new Segment(this.shoulders, this.leftHand, '#000', 16),
            new Segment(this.shoulders, this.rightHand, '#000', 16),
            new Sphere(this.headCenter, 20, '#000'),

            // Wheels
            new Sphere(this.wheelStartTop, 8, '#000'),
            new Sphere(this.wheelStartBottom, 8, '#000'),
            new Sphere(this.wheelEndTop, 8, '#000'),
            new Sphere(this.wheelEndBottom, 8, '#000'),
        ]

    }

    updateRenderables() {

        this.resetPoints();

        this.leftFoot.set( -20, 0, 0);
        this.rightFoot.set(20, 0, 0);
        this.hips.set(0, 0, 200);
        this.shoulders.set(0, 0, 400);
        this.leftHand.set(-40, 0, 200);
        this.rightHand.set(40, 0, 200);
        this.headCenter.set(0, 0, 480);

        this.adjustPoints();

        this.adjustFootPosition(this.leftFoot);
        this.adjustFootPosition(this.rightFoot);

        const footDistance = dist(this.leftFoot, this.rightFoot);
        const slope = (this.rightFoot.z - this.leftFoot.z) / footDistance;
        //
        // this.boardStartTop.set(
        //     this.leftFoot.x - Math.cos(this.angle) * 20 - Math.cos(anglePlus90) * 10,
        //     this.leftFoot.y - Math.sin(this.angle) * 20 - Math.sin(anglePlus90) * 10,
        //     this.leftFoot.z - slope * 20,
        // );
        // this.boardStartBottom.set(
        //     this.leftFoot.x - Math.cos(this.angle) * 20 + Math.cos(anglePlus90) * 10,
        //     this.leftFoot.y - Math.sin(this.angle) * 20 + Math.sin(anglePlus90) * 10,
        //     this.leftFoot.z - slope * 20,
        // );
        // this.boardEndBottom.set(
        //     this.rightFoot.x + Math.cos(this.angle) * 20 + Math.cos(anglePlus90) * 10,
        //     this.rightFoot.y + Math.sin(this.angle) * 20 + Math.sin(anglePlus90) * 10,
        //     this.rightFoot.z + slope * 20,
        // );
        // this.boardEndTop.set(
        //     this.rightFoot.x + Math.cos(this.angle) * 20 - Math.cos(anglePlus90) * 10,
        //     this.rightFoot.y + Math.sin(this.angle) * 20 - Math.sin(anglePlus90) * 10,
        //     this.rightFoot.z + slope * 20,
        // );

        this.makeRectangle(
            this.boardStartTop,
            this.boardStartBottom,
            this.boardEndBottom,
            this.boardEndTop,
            slope,
            40, 20, 0,
        );

        this.makeRectangle(
            this.wheelStartTop,
            this.wheelStartBottom,
            this.wheelEndBottom,
            this.wheelEndTop,
            slope,
            16, 16, -20,
        );

        // console.log(this.boardStartTop.zIndex, this.wheelStartTop.zIndex);

        // this.wheelStartTop.set(
        //     this.leftFoot.x - Math.cos(this.angle) * 15 - Math.cos(anglePlus90) * 8,
        //     this.leftFoot.y - Math.sin(this.angle) * 15 - Math.sin(anglePlus90) * 8,
        //     this.leftFoot.z - slope * 20,
        // );
    }

    makeRectangle(p1, p2, p3, p4, slope, length, width, offsetZ) {
        const anglePlus90 = this.angle + PI / 2;

        p1.set(
            this.leftFoot.x - cos(this.angle) * length - cos(anglePlus90) * width,
            this.leftFoot.y - sin(this.angle) * length - sin(anglePlus90) * width,
            this.leftFoot.z - slope * length + offsetZ,
        );
        p2.set(
            this.leftFoot.x - cos(this.angle) * length + cos(anglePlus90) * width,
            this.leftFoot.y - sin(this.angle) * length + sin(anglePlus90) * width,
            this.leftFoot.z - slope * length + offsetZ,
        );
        p3.set(
            this.rightFoot.x + cos(this.angle) * length + cos(anglePlus90) * width,
            this.rightFoot.y + sin(this.angle) * length + sin(anglePlus90) * width,
            this.rightFoot.z + slope * length + offsetZ,
        );
        p4.set(
            this.rightFoot.x + cos(this.angle) * length - cos(anglePlus90) * width,
            this.rightFoot.y + sin(this.angle) * length - sin(anglePlus90) * width,
            this.rightFoot.z + slope * length + offsetZ,
        );
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        this.velocityZ -= elapsed * 10;
        this.z = max(0, this.z + this.velocityZ);

        this.angle = atan2(this.world.mousePosition.y - this.y, this.world.mousePosition.x - this.x);

        if (this.z === 0) this.velocityZ = 0;

        if (MOUSE_IS_DOWN || true) {
            this.x += elapsed * cos(this.angle) * 400;
            this.y += elapsed * sin(this.angle) * 400;
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
