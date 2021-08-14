class TravellingPanel extends Panel {
    start() {
        this.caption = nomangle('travelled for many days');

        this.rocket = this.addElement(new Element([
            new RocketTrait(),
        ], initPosition(this.panelWidth / 2, this.panelHeight / 2, PI / 8)));

        this.rocket.trait('rocket').flying = true;
    }

    renderBackground() {
        wrap(() => {
            doodleFactor(10);
            R.lineWidth = 40;
            ss('#000');
            scribble(40, 40, this.panelWidth - 80, this.panelHeight - 80, 1, 20);
        });
    }
}
