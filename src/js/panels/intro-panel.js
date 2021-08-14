class IntroPanel extends Panel {
    start() {
        this.spawnHero(this.visualWidth / 2, this.visualHeight * 2 / 3);
    }

    renderCaption() {
        super.renderCaption();

        wrap(() => {
            ss('#000');

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
        this.grassBackground();
        // this.scribbleBackground('#080');
    }
}
