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
        this.landed = true;

        this.momentum = new Point();

        this.renderables = [

            // Wheels
            new Sphere(this.wheelStartTop, 8, '#fff'),
            new Sphere(this.wheelStartBottom, 8, '#fff'),
            new Sphere(this.wheelEndTop, 8, '#fff'),
            new Sphere(this.wheelEndBottom, 8, '#fff'),

            // Board
            new Plane([this.boardEndBottom, this.boardEndTop, this.boardStartTop, this.boardStartBottom], '#ccc'),
            new Segment(this.boardEndBottom, this.boardEndTop, '#fff', 4),
            new Segment(this.boardStartBottom, this.boardStartTop, '#fff', 4),
            new Segment(this.boardStartBottom, this.boardEndBottom, '#fff', 4),
            new Segment(this.boardStartTop, this.boardEndTop, '#fff', 4),

            // Character
            new Segment(this.leftFoot, this.hips, '#fff', 16),
            new Segment(this.rightFoot, this.hips, '#fff', 16),
            new Segment(this.hips, this.shoulders, '#fff', 16),
            new Segment(this.shoulders, this.leftHand, '#fff', 16),
            new Segment(this.shoulders, this.rightHand, '#fff', 16),
            new Sphere(this.headCenter, 20, '#fff'),
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

        // const boardAngle = this.age * PI;
        const boardAngle = 0;

        this.makeRectangle(
            this.boardStartTop,
            this.boardStartBottom,
            this.boardEndBottom,
            this.boardEndTop,
            slope,
            50, 15, 0, boardAngle,
        );

        this.makeRectangle(
            this.wheelStartTop,
            this.wheelStartBottom,
            this.wheelEndBottom,
            this.wheelEndTop,
            slope,
            30, 10, -20, 0, boardAngle,
        );

        // console.log(this.boardStartTop.zIndex, this.wheelStartTop.zIndex);

        // this.wheelStartTop.set(
        //     this.leftFoot.x - Math.cos(this.angle) * 15 - Math.cos(anglePlus90) * 8,
        //     this.leftFoot.y - Math.sin(this.angle) * 15 - Math.sin(anglePlus90) * 8,
        //     this.leftFoot.z - slope * 20,
        // );
    }

    makeRectangle(p1, p2, p3, p4, slope, length, width, offsetZ, angleOffset) {
        const angle = this.angle + angleOffset;
        const anglePlus90 = angle + PI / 2;

        p1.set(
            this.x - cos(angle) * length - cos(anglePlus90) * width,
            this.y - sin(angle) * length - sin(anglePlus90) * width,
            this.z - slope * length + offsetZ,
        );
        p2.set(
            this.x - cos(angle) * length + cos(anglePlus90) * width,
            this.y - sin(angle) * length + sin(anglePlus90) * width,
            this.z - slope * length + offsetZ,
        );
        p3.set(
            this.x + cos(angle) * length + cos(anglePlus90) * width,
            this.y + sin(angle) * length + sin(anglePlus90) * width,
            this.z + slope * length + offsetZ,
        );
        p4.set(
            this.x + cos(angle) * length - cos(anglePlus90) * width,
            this.y + sin(angle) * length - sin(anglePlus90) * width,
            this.z + slope * length + offsetZ,
        );
    }

    land() {
        if (this.landed) {
            return;
        }

        this.landed = true;

        const momentumAngle = atan2(this.momentum.y, this.momentum.x);

        let angleDiff = abs(normalize(this.angle - momentumAngle));
        if (angleDiff > PI / 2) {
            this.angle += PI;
            angleDiff = abs(normalize(this.angle - momentumAngle));
        }

        if (angleDiff > PI / 6) {
            console.log('fall!');
        }
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        const kicker = this.kickerUnder(this);
        if (!kicker && this.z > 0) {
            this.landed = false;
        }

        this.velocityZ -= elapsed * 10;
        this.z = max(0, this.z + this.velocityZ);

        if (this.z === 0) this.land();

        let angleDirection = 0;
        if (INPUT.left()) angleDirection = -1;
        if (INPUT.right()) angleDirection = 1;

        this.angle += elapsed * PI * 1.5 * angleDirection;

        // this.angle = atan2(this.world.mousePosition.y - this.y, this.world.mousePosition.x - this.x);

        if (this.landed) {
            this.momentum.set(
                cos(this.angle),
                sin(this.angle),
            );
        }

        if (this.z === 0) this.velocityZ = 0;

        if (MOUSE_IS_DOWN || true) {
            this.x += elapsed * this.momentum.x * 400;
            this.y += elapsed * this.momentum.y * 400;
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

    kickerUnder(position) {
        return this.world.elements.filter(element => element instanceof Kicker && element.contains(position))[0];
    }

    adjustFootPosition(foot) {
        const kicker = this.kickerUnder(foot);
        if (kicker) {
            const relative = kicker.relativePosition(foot);
            const progress = 1 - (kicker.radius - relative.x) / kicker.length;
            foot.z = Math.max(foot.z, progress * kicker.height);
        }
    }

    jump() {
        this.landed = false;
        this.velocityZ = 8;
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
