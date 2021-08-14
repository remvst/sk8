class LandingPanel extends Panel {
    start() {
        this.scale = 0.5;

        this.rocket = this.addElement(new Element([
            new RocketTrait(),
        ], initPosition(400, 0)));
        this.rocket.trait('rocket').flying = true;

        interp(this.rocket, 'y', -200, this.visualHeight / 2, 1, 2, null, () => {
            this.rocket.trait('rocket').flying = false;

            setTimeout(() => {
                this.addElement(new Element([
                    new CharacterTrait(),
                    new HeroTrait(),
                    new BoundTrait(50),
                    new WeaponHolderTrait(),
                    new CollidableTrait(50),
                ], initPosition(this.rocket.x + 100, this.rocket.y)));
            }, 1000);
        });

        this.addElement(new Element([
            new CharacterTrait(),
            new KamikazeTrait(),
            new CollidableTrait(50, 99),
        ], initPosition(this.visualWidth * 2 / 3, this.visualHeight / 2)));

        this.addElement(new Element([
            new CharacterTrait(),
            new KamikazeTrait(),
            new CollidableTrait(50),
        ], initPosition(this.visualWidth * 2 / 3, this.visualHeight / 2 + 50)));

        this.addElement(new Element([
            new CharacterTrait(),
            new KamikazeTrait(),
            new CollidableTrait(50),
        ], initPosition(this.visualWidth * 2 / 3, this.visualHeight / 2 - 50)));

        this.addElement(new Element([
            new RockTrait(),
            new CollidableTrait(50, 999),
        ], initPosition(this.visualWidth * 2 / 3, this.visualHeight / 2 + 50)));
    }

    renderBackground() {
        this.grassBackground('#00f');
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
