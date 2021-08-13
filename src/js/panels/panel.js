class Panel {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.panelWidth = w;
        this.panelHeight = h;
        this.elements = [];
    }

    addElement(x) {
        this.elements.push(x);
        x.bind(this);
    }

    removeElement(x) {
        remove(this.elements, x);
    }

    start() {

    }

    next() {
        // TODO
    }

    cycle(elapsed) {
        this.mousePosition = {
            'x': MOUSE_POSITION.x - this.x,
            'y': MOUSE_POSITION.y - this.y,
        };

        this.elements.forEach(x => x.cycle(elapsed));
    }

    render() {
        wrap(() => {
            translate(this.x, this.y);
            this.renderBackground();
            this.renderContent();
            this.renderEdges();
        });
    }

    renderBackground() {

    }

    renderContent() {
        this.elements.forEach(x => x.render());
    }

    renderEdges() {
        ss('#000');

        closedPath(() => {
            rectangle(0, 0, this.panelWidth, this.panelHeight);
        }).stroke();
    }

    scribbleBackground(color) {
        wrap(() => {
            doodleFactor(10);
            R.lineWidth = 40;
            R.globalAlpha = 0.5;
            ss('#080');
            scribble(40, 40, this.panelWidth - 80, this.panelHeight - 80, 1, 50);
        });
    }

    grassBackground() {
        ss('#0f0');
        for (let i = 0 ; i < 20 ; i++) {
            path(() => {
                doodleFactor(20);
                translate(DETAILS_RNG.between(0, this.panelWidth), DETAILS_RNG.between(0, this.panelHeight));
                line(-50, 0, 50, 0);
            }).stroke();
        }
    }
}
