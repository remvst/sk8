class TestPanel extends Panel {
    start() {
        this.addElement(new Element([
            new CharacterTrait(),
            new HeroTrait(),
            new BoundTrait(50),
            new WeaponHolderTrait(),
        ], initPosition(this.panelWidth / 3, this.panelHeight / 2)));

        this.addElement(new Element([
            new RocketTrait(),
        ], initPosition(this.panelWidth * 2 / 3, this.panelHeight / 2)));
    }

    renderBackground() {
        this.grassBackground();
        // this.scribbleBackground('#080');
    }
}
