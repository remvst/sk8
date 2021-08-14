class TestPanel extends Panel {
    start() {
        this.addElement(new Element([
            new CharacterTrait(),
            new HeroTrait(),
            new BoundTrait(50),
            new WeaponHolderTrait(),
        ], initPosition(this.panelWidth / 2, this.panelHeight * 2 / 3)));
    }

    renderBackground() {
        this.grassBackground();
        // this.scribbleBackground('#080');
    }
}
