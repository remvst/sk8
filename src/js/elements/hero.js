class Hero extends Element {

    constructor(input) {
        super();

        this.velocityZ = 0;
        this.speed = 0;
        this.momentum = point();
        this.input = input;

        this.velocityZ = 0;

        this.jumpStartZ = 0;
        this.jumpEndZ = 0;
        this.jumpStartAge = 0;
        this.jumpEndAge = 0;

        this.center = this.newPoint();
        this.floorReference = this.newPoint();
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
        this.squatStart = 0;
        this.grinding = false;
        this.lastRail = null;
        this.grindingAngle = 0;
        this.grindingOffsetAngle = 0;
        this.landed = true;
        this.positionSign = 1;
        this.handsZ = -100;

        this.pushing = false;
        this.pushingAnimationRatio = 0;
        this.lastPush = 0;
        this.pushAge = 0;
        this.pushingUntil = 0;

        this.safePool = [point(), point()];
        this.nextSafeCheck = 0;

        this.performingTrick = false;
        this.trickProgress = 0;
        this.releasedPush = false;

        this.balance = 0;

        this.comboTracker = new ComboTracker(this);

        this.renderables = [new CompositeRenderable([
            segment(this.floorReference, this.center, '#fff3', 2),

            // Wheels
            sphere(this.wheelStartTop, 8, COLOR_WHITE),
            sphere(this.wheelStartBottom, 8, COLOR_WHITE),
            sphere(this.wheelEndTop, 8, COLOR_WHITE),
            sphere(this.wheelEndBottom, 8, COLOR_WHITE),

            // Board
            new Plane([this.boardEndBottom, this.boardEndTop, this.boardStartTop, this.boardStartBottom], '#ccc'),
            segment(this.boardEndBottom, this.boardEndTop, COLOR_WHITE, 4),
            segment(this.boardStartBottom, this.boardStartTop, COLOR_WHITE, 4),
            segment(this.boardStartBottom, this.boardEndBottom, COLOR_WHITE, 4),
            segment(this.boardStartTop, this.boardEndTop, COLOR_WHITE, 4),

            // Character
            segment(this.leftFoot, this.leftKnee, COLOR_WHITE, 16),
            segment(this.rightFoot, this.rightKnee, COLOR_WHITE, 16),
            segment(this.hips, this.leftKnee, COLOR_WHITE, 16),
            segment(this.hips, this.rightKnee, COLOR_WHITE, 16),
            segment(this.hips, this.shoulders, COLOR_WHITE, 16),
            segment(this.shoulders, this.leftHand, COLOR_WHITE, 16),
            segment(this.shoulders, this.rightHand, COLOR_WHITE, 16),
            segment(this.shoulders, this.headCenter, COLOR_WHITE, 16),
            sphere(this.headCenter, 20, COLOR_WHITE),
        ], this.center)];
    }

    get draggable() {
        return this.landed && !this.grinding;
    }

    updateRenderables() {
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
            point.y *= this.positionSign;

            if (this.grinding) point.z += rnd(0, 10) * this.speed / 600;
        });

        const pushRatio = sin(this.pushAge * TWO_PI / PUSH_PERIOD);
        this.leftFoot.y += (pushRatio * 30) * this.pushingAnimationRatio;
        this.leftKnee.y += (pushRatio * 20 + 10) * this.pushingAnimationRatio;
        this.rotateAroundAxis(this.rightFoot.x, 0, -PI / 2 * this.positionSign * this.pushingAnimationRatio);

        this.adjustPoints();

        this.center.set(this.x, this.y, this.z);

        this.adjustFootPosition(this.leftFoot);
        this.adjustFootPosition(this.rightFoot);

        const footDistance = dist(this.leftFoot, this.rightFoot);
        let slope = (this.rightFoot.z - this.leftFoot.z) / footDistance;

        if (!this.landed && !this.grinding) {
            slope = PI / 4;
        }

        this.leftFoot.z = this.leftFoot.z - sin(slope) * footDistance / 2;
        this.rightFoot.z = this.rightFoot.z + sin(slope) * footDistance / 2;

        const slopeRatio = 0.5 - (this.trickProgress % 1);
        const boardSlope = slopeRatio * ((this.trickProgress % 2) >= 1 ? -slope : slope);

        this.makeRectangle(
            this.boardStartTop,
            this.boardStartBottom,
            this.boardEndBottom,
            this.boardEndTop,
            boardSlope,
            50, 15, 0, this.trickProgress * PI,
        );

        this.makeRectangle(
            this.wheelStartTop,
            this.wheelStartBottom,
            this.wheelEndBottom,
            this.wheelEndTop,
            boardSlope,
            30, 10, -20, this.trickProgress * PI,
        );

        this.center.projectToActual();

        this.floorReference.set(this.x, this.y, 0);
    }

    makeRectangle(p1, p2, p3, p4, slope, rectangleLength, rectangleWidth, offsetZ, angleOffset) {
        const angle = this.angle + angleOffset;
        const anglePlus90 = angle + PI / 2;

        p1.set(
            this.x - cos(angle) * rectangleLength - cos(anglePlus90) * rectangleWidth,
            this.y - sin(angle) * rectangleLength - sin(anglePlus90) * rectangleWidth,
            this.z - slope * rectangleLength + offsetZ,
        );
        p2.set(
            this.x - cos(angle) * rectangleLength + cos(anglePlus90) * rectangleWidth,
            this.y - sin(angle) * rectangleLength + sin(anglePlus90) * rectangleWidth,
            this.z - slope * rectangleLength + offsetZ,
        );
        p3.set(
            this.x + cos(angle) * rectangleLength + cos(anglePlus90) * rectangleWidth,
            this.y + sin(angle) * rectangleLength + sin(anglePlus90) * rectangleWidth,
            this.z + slope * rectangleLength + offsetZ,
        );
        p4.set(
            this.x + cos(angle) * rectangleLength - cos(anglePlus90) * rectangleWidth,
            this.y + sin(angle) * rectangleLength - sin(anglePlus90) * rectangleWidth,
            this.z + slope * rectangleLength + offsetZ,
        );
    }

    land() {
        if (this.landed) {
            return;
        }

        if (this.trickProgress % 1 > 0) {
            this.bail();
        }

        this.lastRail = null;

        this.trickProgress = 0;
        this.landed = true;
        this.balance = 0;

        const momentumAngle = atan2(this.momentum.y, this.momentum.x);

        let angleDiff = abs(normalize(this.angle - momentumAngle));
        if (angleDiff > PI / 2) {
            this.positionSign *= -1;
            this.angle += PI;
            angleDiff = abs(normalize(this.angle - momentumAngle));
        }

        if (angleDiff > PI / 3 && this.speed > 300) {
            this.bail();
        }

        interp(this, 'squatFactor', 1, 0, 0.2, 0.2);
        interp(this, 'squatFactor', 0, 1, 0.2);
        interp(this, 'handsZ', this.handsZ, -100, 0.2);

        if (this.velocityZ < -1) {
            for (let i = 0 ; i < 50 ; i++) {
                const angle = random() * TWO_PI;
                const distance = rnd(50, 100);
                this.world.particle({
                    'size': [20, -10],
                    'color': COLOR_WHITE,
                    'duration': rnd(0.2, 0.4),
                    'x': [this.x + rnd(-20, 20), cos(angle) * distance],
                    'y': [this.y + rnd(-20, 20), sin(angle) * distance],
                    'z': [this.z, 0],
                    'easing': easeOutCirc,
                });
            }
        }

        if (this.input.userControlled) {
            landSound();
        }
    }

    bail() {
        if (this.bailed) {
            return;
        }

        this.bailed = true;
        this.grinding = false;

        const copy = new Element();
        copy.renderables = this.renderables.map(x => x.clone());
        copy.renderables.forEach(renderable => {
            renderable.animateToGround(this);
        });
        this.world.addElement(copy);

        this.world.removeElement(this);

        setTimeout(() => {
            this.world.removeElement(copy);

            const newHero = new Hero(this.input);
            newHero.x = this.safePool[0].x;
            newHero.y = this.safePool[0].y;
            newHero.z = this.safePool[0].z;
            this.world.addElement(newHero);
        }, 2000);

        G.transition('#f00', 0.3);

        if (this.input.userControlled) {
            bailSound();
        }
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (this.draggable) {
            const angleDirection = this.input.direction();
            const diff = limit(-elapsed * PI * 1.5, normalize(angleDirection - this.angle), elapsed * PI * 1.5);
            this.angle += diff;

            this.momentum.set(cos(this.angle), sin(this.angle));
        }

        this.x += elapsed * this.momentum.x * this.speed;
        this.y += elapsed * this.momentum.y * this.speed;

        const wasPushing = this.pushing;

        if (this.age > this.pushingUntil) {
            if (this.landed && this.input.pushing()) {
                this.pushing = true;
                this.speed = min(600, this.speed + 300);
                this.pushingUntil = this.age + PUSH_PERIOD;
                this.pushAge = 0;
                if (!wasPushing) {
                    interp(this, 'pushingAnimationRatio', this.pushingAnimationRatio, 1, 0.2);
                }
            } else {
                this.pushing = false;
                if (wasPushing) {
                    interp(this, 'pushingAnimationRatio', this.pushingAnimationRatio, 0, 0.2);
                }
            }
        }

        if (!this.input.pushing()) {
            this.releasedPush = true;
        }

        this.pushAge += elapsed;

        if (!this.grinding && !this.pushing && this.landed) {
            this.speed -= sign(this.speed) * elapsed * (this.speed > 0 ? 20 : 600);
        }

        if (this.grinding) {
            this.grindDuration += elapsed;

            const angle = random() * TWO_PI;
            const distance = rnd(10, 20);
            this.world.particle({
                'size': [10, -10],
                'color': '#ff0',
                'duration': rnd(0.4, 0.8),
                'x': [this.x + rnd(-10, 10), cos(angle) * distance],
                'y': [this.y + rnd(-10, 10), sin(angle) * distance],
                'z': [this.z, rnd(-20, 20)],
            });

            const rotationDirection = this.input.rotation();
            this.balance += this.balance * elapsed + rotationDirection * elapsed;
            this.balance = limit(-1, this.balance, 1);

            this.speed = max(100, this.speed);
        }

        if (this.landed) {
            this.grindDuration = 0;
        }

        // Trick progress
        this.performingTrick = !this.landed && this.input.trick() && !this.grinding && this.releasedPush;

        const addedTrickProgress = min(ceil(this.trickProgress) - this.trickProgress, elapsed / 0.3);
        if (this.performingTrick) {
            addedTrickProgress = elapsed / 0.4;
        }

        this.trickProgress += addedTrickProgress;

        // Come off a kicker
        if (this.landed && this.z > 0) {
            if (!this.kickerUnder(this)) this.stopLanding();
        }

        if (this.input.grind()) {
            this.jumpEndAge = this.age;
            this.velocityZ = min(this.velocityZ, 0);
        }

        if (this.age < this.jumpEndAge) {
            const jumpDuration = this.jumpEndAge - this.jumpStartAge;
            const ratio = easeOutQuad(limit(0, (this.age - this.jumpStartAge) / jumpDuration, 1));
            const ratioBefore = easeOutQuad(limit(0, (this.age - elapsed - this.jumpStartAge) / jumpDuration, 1));
            const newZ = this.jumpStartZ + ratio * (this.jumpEndZ - this.jumpStartZ);
            this.velocityZ = (ratio - ratioBefore) * (this.jumpEndZ - this.jumpStartZ);
        } else {
            const gravity = (this.input.grind() ? 3 : 1) * 20;
            this.velocityZ = min(0, this.velocityZ - elapsed * gravity);
        }

        this.z = max(0, this.z + this.velocityZ);

        // Fall down
        if (this.z === 0) this.land();
        if (this.landed || this.grinding) this.velocityZ = 0;

        // Air rotation
        if (!this.landed && !this.grinding) {
            const rotationDirection = this.input.rotation();
            this.angle += rotationDirection * PI * 4 * elapsed;

            ROTATION_ACC += limit(-elapsed * 4, -ROTATION_ACC, elapsed * 4);
        }

        // Grinding update
        const wasGrinding = this.grinding;
        this.checkGrinds();
        if (this.grinding) {
            this.angle = this.grindingAngle + this.grindingOffsetAngle;
            this.momentum.set(cos(this.grindingAngle), sin(this.grindingAngle));
        }

        // Update squat
        if (this.landed || this.grinding || wasGrinding) {
            const squatting = this.input.squat();
            if (this.squatting && !squatting) {
                this.jump();
            } else if (squatting && !this.squatting) {
                interp(this, 'squatFactor', 0, 1, 0.2);
                this.squatStart = this.age;
            }
            this.squatting = squatting;
        }

        // Collisions
        if (this.shouldBail()) {
            this.bail();
        }

        // Update safe positions
        if ((this.nextSafeCheck -= elapsed) <= 0 && this.z === 0) {
            this.nextSafeCheck = 1;

            const point = this.safePool.shift();
            point.set(this.x, this.y, this.z);
            this.safePool.push(point);
        }

        this.comboTracker.cycle(elapsed);
    }

    kickerUnder(position) {
        return this.world.elements.filter(element => element instanceof Kicker && element.contains(position))[0];
    }

    adjustFootPosition(foot) {
        const kicker = this.kickerUnder(foot);
        if (kicker) {
            const relative = kicker.relativePosition(foot);
            const progress = 1 - (kicker.radius - relative.x) / kicker.kickerLength;
            foot.z = max(foot.z, progress * kicker.kickerHeight);
        }
    }

    stopLanding() {
        this.landed = false;
        interp(this, 'handsZ', this.handsZ, 40, 0.2);
        this.squatFactor = 0;
    }

    startGrinding() {
        this.grinding = true;
        this.trickProgress = 0;
        this.balance = this.balance || rnd(-0.1, 0.1);

        interp(this, 'squatFactor', 0, 1, 0.2);
        interp(this, 'handsZ', this.handsZ, -100, 0.2);
    }

    jump() {
        this.stopLanding();

        this.releasedPush = false;

        let squatRatio = min(1, this.age - this.squatStart);
        if (this.kickerUnder(this)) {
            squatRatio += this.speed / 600;
        }

        this.velocityZ = 1;
        this.grinding = false;
        this.pushing = false;

        this.jumpStartAge = this.age;
        this.jumpEndAge = this.age + 0.2 + squatRatio * 0.3;
        this.jumpStartZ = this.z;
        this.jumpEndZ = this.z + 150 + squatRatio * 200;

        interp(this, 'pushingAnimationRatio', this.pushingAnimationRatio, 0, 0.2);

        if (this.input.userControlled) {
            jumpSound();
        }
    }

    checkGrinds() {
        if (!this.input.grind() || this.trickProgress % 1 > 0) {
            this.grinding = false;
            return;
        }

        const wasGrinding = this.grinding;
        const currentMomentumAngle = atan2(this.momentum.y, this.momentum.x);

        let collidesWithRail = false;

        for (const rail of this.world.elements) {
            if (!(rail instanceof Rail)) {
                continue;
            }

            const grindCollision = this.velocityZ < 0 || this.grinding ? rail.collides(this, RAIL_GRIND_PADDING) : null;

            rail.heroMayGrind = !!grindCollision;

            if (grindCollision) {
                if (!wasGrinding && sign(grindCollision.positionOnRail.z - this.z) == sign(grindCollision.positionOnRail.z - this.previous.z)) {
                    continue;
                }

                this.lastRail = rail;

                collidesWithRail = true;

                if (!wasGrinding) {
                    this.startGrinding();
                }

                if (this.grinding && !wasGrinding) {
                    const clicks = round((this.angle - grindCollision.grindingAngle) / (PI / 2));
                    this.grindingOffsetAngle = clicks * PI / 2;
                }

                if (this.grinding) {
                    this.grindingAngle = grindCollision.grindingAngle;

                    this.momentum.x = cos(grindCollision.grindingAngle);
                    this.momentum.y = sin(grindCollision.grindingAngle);

                    if (abs(normalize(grindCollision.grindingAngle - currentMomentumAngle)) > PI / 2) {
                        this.momentum.x *= -1;
                        this.momentum.y *= -1;
                        this.grindingAngle += PI;
                    }

                    if (this.input.userControlled) {
                        MOVEMENT_TARGET_DIRECTION.x = 400 * cos(this.grindingAngle);
                        MOVEMENT_TARGET_DIRECTION.y = 400 * sin(this.grindingAngle);
                    }

                    this.x = grindCollision.positionOnRail.x;
                    this.y = grindCollision.positionOnRail.y;
                    this.z = grindCollision.positionOnRail.z;
                }
            }
        }

        if (!collidesWithRail && wasGrinding) {
            this.grinding = false;
        }
    }

    shouldBail() {
        if (this.grinding) {
            return abs(this.balance) >= 1;
        }

        const footDistance = dist(this.leftFoot, this.rightFoot);
        const slope = (this.rightFoot.z - this.leftFoot.z) / footDistance;
        if (abs(slope) > 2) {
            return true;
        }

        const currentMomentumAngle = atan2(this.momentum.y, this.momentum.x);

        for (const element of this.world.elements) {
            if (element instanceof Rail) {
                const hardCollision = element.collides(this, RAIL_BAIL_PADDING);
                if (hardCollision && between(this.z + RAIL_BAIL_PADDING, hardCollision.positionOnRail.z, this.headCenter.z)) {
                    this.speed = -300;
                    return;
                }
            }

            if (element instanceof Pole && element.collides(this)) {
                this.speed = -300;
                return;
            }
        }
    }
}
