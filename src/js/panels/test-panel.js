class TestPanel extends Panel {
    start() {
        this.scale = 0.5;

        this.addElement(new Element([
            new CharacterTrait('hero'),
            new HeroTrait(),
            new BoundTrait(50),
            new WeaponHolderTrait(),
            new CollidableTrait(50, ),
        ], initPosition(this.panelWidth / 3, this.panelHeight / 2)));

        this.fillRectangle(0, 0, this.visualWidth, this.visualHeight, 20, (x, y) => {
            this.spawnRock(x, y);
        });
    }

    renderBackground() {
        this.scribbleBackground('#db588d');
    }
}
