class TestPanel extends Panel {
    start() {
        this.hero = this.addElement(new Element([
            new CharacterTrait(),
            new HeroTrait(),
            new BoundTrait(50),
            new WeaponHolderTrait(),
        ], initPosition(this.panelWidth / 3, this.panelHeight / 2)));

        this.rocket = this.addElement(new Element([
            new RocketTrait(),
        ], initPosition(this.panelWidth * 2 / 3, this.panelHeight / 2)));
    }

    renderBackground() {
        this.grassBackground();
        // this.scribbleBackground('#080');
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (!this.absorbed) {
            if (dist(this.hero, this.rocket) < 50) {
                this.hero.remove();

                this.rocket.trait('rocket').flying = true;

                interp(this.rocket, 'y', this.rocket.y, -200, 2, 0, easeInExpo);
            }
        }
    }
}
