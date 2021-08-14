class LandingPanel extends Panel {
    start() {
        this.rocket = this.addElement(new Element([
            new RocketTrait(),
        ], initPosition(400, 0)));
        this.rocket.trait('rocket').flying = true;

        interp(this.rocket, 'y', -200, this.panelHeight / 2, 1, 2, null, () => {
            this.rocket.trait('rocket').flying = false;

            setTimeout(() => {
                this.addElement(new Element([
                    new CharacterTrait(),
                    new HeroTrait(),
                    new BoundTrait(50),
                    new WeaponHolderTrait(),
                ], initPosition(this.rocket.x + 100, this.rocket.y)));
            }, 1000);
        });
    }

    renderBackground() {
        this.grassBackground();
        // this.scribbleBackground('#080');
    }

    cycle(elapsed) {
        super.cycle(elapsed);
        //
        // if (!this.absorbed) {
        //     if (dist(this.hero, this.rocket) < 50) {
        //         this.hero.remove();
        //
        //         this.rocket.trait('rocket').flying = true;
        //
        //         interp(this.rocket, 'y', this.rocket.y, -200, 2, 0, easeInExpo);
        //     }
        // }
    }
}
