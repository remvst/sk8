class TravellingPanel extends Panel {
    start() {
        this.caption = nomangle('travelled for many days');

        this.rocket = this.addElement(new Element([
            new RocketTrait(),
        ], initPosition(this.panelWidth / 2, this.panelHeight / 2, PI / 8)));

        this.rocket.trait('rocket').flying = true;
    }

    renderBackground() {
        this.scribbleBackground('#000', 1);
    }
}
