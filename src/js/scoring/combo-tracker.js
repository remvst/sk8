class ComboTracker {
    constructor(hero) {
        this.hero = hero;
        this.previous = {};
        this.updatePrevious();

        this.rotationAcc = 0;

        this.combo = new Combo();
        this.lastCombo = null;
        this.locked = false;
    }

    updatePrevious() {
        const { hero } = this;
        this.previous.x = hero.x;
        this.previous.y = hero.y;
        this.previous.angle = hero.angle;
        this.previous.velocityZ = hero.velocityZ;
        this.previous.landed = hero.landed;
        this.previous.bailed = hero.bailed;
        this.previous.trickProgress = hero.trickProgress;
        this.previous.grinding = hero.grinding;
        this.previous.lastRail = hero.lastRail;
        this.previous.rotationAcc = this.rotationAcc;
    }

    cycle(elapsed) {
        const { combo, hero, previous } = this;
        const { scene } = hero.world;

        if (hero.velocityZ > 0 && (previous.landed || previous.grinding)) {
            if (this.hero.kickerUnder(this.hero)) {
                combo.pushTrick(nomangle('OFF THE KICKER'), 100);
            }
            combo.pushTrick(nomangle('OLLIE'), 100);
        }

        if (hero.lastRail && previous.lastRail && hero.lastRail != previous.lastRail) {
            combo.pushTrick(nomangle('RAIL TO RAIL'), 400);
        }

        if (hero.grinding) {

            if (!previous.grinding) {
                const slide = round(hero.grindingOffsetAngle / (PI / 2)) % 2;
                combo.pushTrick(slide ? nomangle('SLIDE') : nomangle('GRIND'), 500);
            }

            combo.accumulate(dist(hero, previous) * 0.5);
        }

        if (hero.landed || hero.grinding) {
            this.rotationAcc = 0;
        } else {
            this.rotationAcc += previous.angle - hero.angle;
            combo.setRotation(this.rotationAcc);
        }

        if (hero.trickProgress > 0) {
            if (previous.trickProgress == 0) {
                combo.pushTrick(nomangle('FLIPPITY'), 500);
            }

            if (ceil(previous.trickProgress) < ceil(hero.trickProgress) && hero.input.userControlled) {
                trickSound();
            }

            combo.setCount(ceil(hero.trickProgress));
        }

        if ((hero.landed || hero.bailed) && combo.tricks.length) {
            if (!hero.bailed) {
                if (!this.locked) {
                    const base = scene instanceof SessionScene ? scene.score : 0;
                    scene.score = base + combo.total;
                }

                // if (previous.rotationAcc > PI / 2) {
                //     let angleRatio = abs(normalize(previous.rotationAcc) / PI);
                //     if (angleRatio > 0.5) {
                //         angleRatio = 1 - angleRatio;
                //     }
                //
                //     console.log(angleRatio);
                //
                //     if (angleRatio < 0.1) {
                //         console.log('good landing!')
                //     } else if (angleRatio > 0.4) {
                //         console.log('bad landing!')
                //     }
                //
                //     // TODO record good/bad landing
                // }

                if (scene instanceof ParkScene) {
                    this.checkAllChallenges();
                }
            }

            combo.bailed = hero.bailed;
            combo.landed = !hero.bailed;

            this.lastCombo = combo;
            this.lastComboAge = hero.world.age;

            if (scene instanceof ParkScene) {
                maxToLocalStorage(HIGHSCORE_KEY, scene.score);
                maxToLocalStorage(BESTCOMBO_KEY, combo.total);
            }

            this.combo = new Combo();
        }

        this.updatePrevious();
    }

    checkAllChallenges() {
        CHALLENGES.forEach(x => {
            if (x.checkCompleted(this.hero, this.combo)) {
                G.scene.hud.showMessage(nomangle('Challenge completed: ') + x.label, 4);
            }
        });
    }
}
