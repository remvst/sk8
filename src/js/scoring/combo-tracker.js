class ComboTracker {
    constructor(hero) {
        this.hero = hero;
        this.previous = {};
        this.updatePrevious();

        this.rotationAcc = 0;

        this.combo = new Combo();
        this.lastCombo = null;
    }

    updatePrevious() {
        this.previous.angle = this.hero.angle;
        this.previous.velocityZ = this.hero.velocityZ;
        this.previous.landed = this.hero.landed;
        this.previous.bailed = this.hero.bailed;
        this.previous.trickProgress = this.hero.trickProgress;
        this.previous.grinding = this.hero.grinding;
        this.previous.lastRail = this.hero.lastRail;
        this.previous.rotationAcc = this.rotationAcc;
    }

    cycle(elapsed) {
        const { combo } = this;

        if (this.hero.velocityZ > 0 && (this.previous.landed || this.previous.grinding)) {
            if (this.hero.kickerUnder(this.hero)) {
                combo.pushTrick(nomangle('OFF THE KICKER'), 100);
            }
            combo.pushTrick(nomangle('OLLIE'), 100);
        }

        if (this.previous.lastRail && this.hero.lastRail != this.previous.lastRail) {
            combo.pushTrick(nomangle('RAIL TO RAIL'), 400);
        }

        if (this.hero.grinding) {

            if (!this.previous.grinding) {
                const slide = round(this.hero.grindingOffsetAngle / (PI / 2)) % 2;
                combo.pushTrick(slide ? nomangle('SLIDE') : nomangle('GRIND'), 500);
            }

            combo.accumulate(elapsed * 1000);
        }

        if (this.hero.landed || this.hero.grinding) {
            this.rotationAcc = 0;
        } else {
            this.rotationAcc += this.previous.angle - this.hero.angle;
            combo.setRotation(this.rotationAcc);
        }

        if (this.hero.trickProgress > 0) {
            if (this.previous.trickProgress == 0) {
                combo.pushTrick(nomangle('FLIPPITY'), 500);
            }

            combo.setCount(ceil(this.hero.trickProgress));
        }

        if ((this.hero.landed || this.hero.bailed) && this.combo.tricks.length) {
            if (!this.hero.bailed) {
                this.hero.world.scene.score += this.combo.total;

                if (this.previous.rotationAcc > PI / 2) {
                    let angleRatio = abs(normalize(this.previous.rotationAcc) / PI);
                    if (angleRatio > 0.5) {
                        angleRatio = 1 - angleRatio;
                    }

                    console.log(angleRatio);

                    if (angleRatio < 0.1) {
                        console.log('good landing!')
                    } else if (angleRatio > 0.4) {
                        console.log('bad landing!')
                    }

                    // TODO record good/bad landing
                }
            }

            this.combo.bailed = this.hero.bailed;
            this.combo.landed = !this.hero.bailed;

            this.lastCombo = this.combo;
            this.lastComboAge = this.hero.world.age;

            this.combo = new Combo();
        }

        this.updatePrevious();
    }
}
