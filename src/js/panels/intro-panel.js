class IntroPanel extends Panel {
    start() {
        this.addElement(new Element([
            new HeroTrait(),
        ], initPosition(this.panelWidth / 2, this.panelHeight * 2 / 3)));
    }

    renderContent() {
        super.renderContent();

        wrap(() => {
            R.lineWidth = 15;

            doodleFactor(2);

            translate(this.panelWidth / 2, 100);
            renderCenteredString(nomangle("doodle boy"), 64, 100, 20);

            R.lineWidth = 10;

            translate(0, 120);
            renderCenteredString(nomangle('goes to space'), 44, 60, 20);
        });
    }

    renderBackground() {
        this.scribbleBackground('#080');
    }
}
