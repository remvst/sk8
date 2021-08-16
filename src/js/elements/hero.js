class Hero extends Element {

    constructor() {
        super();
        this.velocityZ = 0;

        this.leftFoot = this.newPoint();
        this.leftKnee = this.newPoint();
        this.rightFoot = this.newPoint();
        this.rightKnee = this.newPoint();
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
        this.squatFactor = 0;
        this.grinding = false;
        this.grindingAngle = 0;
        this.grindingOffsetAngle = 0;
        this.landed = true;
        this.positionSign = 1;
        this.handsZ = -100;

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
            new Segment(this.leftFoot, this.leftKnee, '#fff', 16),
            new Segment(this.rightFoot, this.rightKnee, '#fff', 16),
            new Segment(this.hips, this.leftKnee, '#fff', 16),
            new Segment(this.hips, this.rightKnee, '#fff', 16),
            new Segment(this.hips, this.shoulders, '#fff', 16),
            new Segment(this.shoulders, this.leftHand, '#fff', 16),
            new Segment(this.shoulders, this.rightHand, '#fff', 16),
            new Segment(this.shoulders, this.headCenter, '#fff', 16),
            new Sphere(this.headCenter, 20, '#fff'),
        ];
    }

    updateRenderables() {
        this.resetPoints();

        const kneeForwardFactor = 0.5 + this.squatFactor * 0.5;
        const halfLegLength = 100 - kneeForwardFactor * 60;

        this.leftFoot.set( -20, 0, 0);
        this.rightFoot.set(20, 0, 0);
        this.leftKnee.set( -15, kneeForwardFactor * 20, halfLegLength);
        this.rightKnee.set(15, kneeForwardFactor * 20, halfLegLength);
        this.hips.set(0, -kneeForwardFactor * 15, halfLegLength * 2);
        this.shoulders.set(0, kneeForwardFactor * 10, this.hips.z + 150 - kneeForwardFactor * 10);
        this.leftHand.set(-40, kneeForwardFactor * 10, this.shoulders.z + this.handsZ);
        this.rightHand.set(40, kneeForwardFactor * 10, this.shoulders.z + this.handsZ);
        this.headCenter.set(0, this.shoulders.y + kneeForwardFactor * 20, this.shoulders.z + 20 - kneeForwardFactor * 10);

        this.points.forEach(point => {
            // point.x *= this.positionSign;
            point.y *= this.positionSign;
        });

        this.adjustPoints();

        this.adjustFootPosition(this.leftFoot);
        this.adjustFootPosition(this.rightFoot);

        const footDistance = dist(this.leftFoot, this.rightFoot);
        let slope = (this.rightFoot.z - this.leftFoot.z) / footDistance;

        if (!this.landed) {
            // slope = PI / 4 * this.positionSign;
        }

        this.leftFoot.z = this.leftFoot.z - Math.sin(slope) * footDistance / 2;
        this.rightFoot.z = this.rightFoot.z + Math.sin(slope) * footDistance / 2;

        // const boardAngle = this.age * PI;
        const boardAngle = this.landed || this.grinding ? 0 : this.age * 2 * PI;

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
            30, 10, -20, boardAngle,
        );
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
            this.positionSign *= -1;
            this.angle += PI;
            angleDiff = abs(normalize(this.angle - momentumAngle));
        }

        if (angleDiff > PI / 6) {
            this.bail();
        }

        interp(this, 'squatFactor', 1, 0, 0.2, 0.2);
        interp(this, 'squatFactor', 0, 1, 0.2);
        interp(this, 'handsZ', this.handsZ, -100, 0.2);
    }

    bail() {
        const copy = new Element();
        copy.renderables = this.renderables.map(renderable => renderable.clone());
        copy.renderables.forEach(renderable => {
            renderable.animateToGround(this);
        });
        this.world.addElement(copy);

        this.world.removeElement(this);

        setTimeout(() => {
            this.world.removeElement(copy);
            this.world.addElement(this);
        }, 2000);
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (this.landed && !this.squatting) {
            // this.squatFactor = sin(this.age * PI) * 0.5 + 0.5;
        }

        if (this.landed && this.z > 0) {
            const kicker = this.kickerUnder(this);
            if (!kicker) this.stopLanding();
        }

        this.velocityZ -= elapsed * 20;
        this.z = max(0, this.z + this.velocityZ);

        if (this.z === 0) this.land();

        let angleDirection = 0;
        if (INPUT.left()) angleDirection = -1;
        if (INPUT.right()) angleDirection = 1;

        this.angle += elapsed * PI * 1.5 * angleDirection;

        if (this.grinding) {
            this.angle = this.grindingAngle + this.grindingOffsetAngle;
        }

        // this.angle = atan2(this.world.mousePosition.y - this.y, this.world.mousePosition.x - this.x);

        if (this.landed) {
            this.momentum.set(
                cos(this.angle),
                sin(this.angle),
            );
        }

        if (this.z === 0) this.velocityZ = 0;

        if (MOUSE_IS_DOWN || true) {
            const speed = 200;
            this.x += elapsed * this.momentum.x * speed;
            this.y += elapsed * this.momentum.y * speed;
        }

        if (this.landed || this.grinding) {
            const squatting = MOUSE_IS_DOWN;
            if (this.squatting && !squatting) {
                this.jump();
            } else if (squatting && !this.squatting) {
                interp(this, 'squatFactor', 0, 1, 0.2);
            }
            this.squatting = squatting;
        }

        if (this.shouldFall()) {
            this.bail();
        }
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

    stopLanding() {
        this.landed = false;
        interp(this, 'handsZ', this.handsZ, 40, 0.2);
        this.squatFactor = 0;
        // interp(this, 'squatFactor', 1, -0.5, 0.2);
    }

    startGrinding() {
        this.grinding = true;

        interp(this, 'squatFactor', 1, 0, 0.2, 0.2);
        interp(this, 'squatFactor', 0, 1, 0.2);
        interp(this, 'handsZ', this.handsZ, -100, 0.2);
    }

    jump() {
        this.stopLanding();
        this.velocityZ = 10;
        this.grinding = false;
    }

    shouldFall() {
        const footDistance = dist(this.leftFoot, this.rightFoot);
        const slope = (this.rightFoot.z - this.leftFoot.z) / footDistance;
        if (abs(slope > 2)) {
            return true;
        }

        let collidesWithRail = false;

        const currentMomentumAngle = atan2(this.momentum.y, this.momentum.x);

        const wasGrinding = this.grinding;

        for (const rail of this.world.elements) {
            if (rail instanceof Rail) {
                const collides = rail.collides(this);
                if (collides) {
                    collidesWithRail = true;

                    if (!this.grinding) {
                        if (this.z <= collides.positionOnRail.z) {
                            if (this.previous.z >= collides.positionOnRail.z) { // TODO also check for momentum direction
                                this.startGrinding();
                            } else {
                                return true;
                            }
                        }
                    }

                    if (this.grinding && !wasGrinding) {
                        const clicks = Math.round((this.angle - collides.grindingAngle) / (PI / 2));
                        this.grindingOffsetAngle = clicks * PI / 2;
                    }

                    if (this.grinding) {
                        this.grindingAngle = collides.grindingAngle;

                        this.momentum.x = cos(collides.grindingAngle);
                        this.momentum.y = sin(collides.grindingAngle);

                        if (abs(normalize(collides.grindingAngle - currentMomentumAngle)) > PI / 2) {
                            this.momentum.x *= -1;
                            this.momentum.y *= -1;
                        }

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
