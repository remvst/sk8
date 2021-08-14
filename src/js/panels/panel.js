class Panel {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.panelWidth = w;
        this.panelHeight = h;
        this.elements = [];

        this.scribbleProgress = 0;
        this.scribbleAlpha = 0;
        this.age = 0;

        this.mousePosition = {'x': 0, 'y': 0};
    }

    addElement(x) {
        this.elements.push(x);
        x.bind(this);
    }

    removeElement(x) {
        remove(this.elements, x);
    }

    focus(interpDuration = 0) {
        interp(G.camera, 'centerX', G.camera.centerX, this.x + this.panelWidth / 2, interpDuration, 0, easeInOutQuad);
        interp(G.camera, 'centerY', G.camera.centerY, this.y + this.panelHeight / 2, interpDuration, 0, easeInOutQuad);
    }

    restart() {
        this.focus(1);

        this.elements = [];

        interp(this, 'scribbleProgress', 0, 1, 1);
        interp(this, 'scribbleAlpha', 1, 0, 0.2, 1.5);
        this.start();
    }

    start() {

    }

    nextPanel() {
        const index = G.panels.indexOf(this);
        G.startPanel(G.panels[(index + 1) % G.panels.length]);
        // TODO
    }

    cycle(elapsed) {
        this.age += elapsed;

        this.mousePosition.x = MOUSE_POSITION.x - this.x + G.camera.x;
        this.mousePosition.y = MOUSE_POSITION.y - this.y + G.camera.y;

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

        if (this.scribbleAlpha > 0) {
            R.lineWidth = 80;
            R.globalAlpha = this.scribbleAlpha;
            scribble(0, 0, this.panelWidth, this.panelHeight, this.scribbleProgress, 50);
        }
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
