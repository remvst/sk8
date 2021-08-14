DOODLE_RNG = createNumberGenerator(1);

const linesBg = createCanvasPattern(1, 50, (r) => {
    r.fs('#fff');
    r.fr(0, 0, 1, 99);

    r.globalAlpha = 0.25;
    r.fs('#000');
    r.fr(0, 0, 1, 1);
});

class Game {

    constructor() {
        G = this;
        G.clock = 0;

        G.camera = new Camera();

        G.panels = [
            new IntroPanel(50, 50, 1000, 700),
            new TakeOffPanel(1100, 50, 1000, 700),
            new TravellingPanel(50, 800, 800, 700),
            new LandingPanel(900, 800, 1500, 700),
            new TestPanel(50, 1600, 700, 700),
            // new Panel(50, 1600, 1500, 700),
        ];
        this.startPanel(G.panels[G.panels.length - 1]);

        INTERPOLATIONS = [];
        this.currentPanel.focus(0);
    }

    startPanel(panel) {
        this.currentPanel = panel;
        panel.restart();
    }

    cycle(elapsed) {
        G.clock += elapsed;

        this.currentPanel.cycle(elapsed);
        INTERPOLATIONS.forEach(x => x.cycle(elapsed));

        // TODO
    }

    render() {
        DOODLE_RNG = createNumberGenerator(~~(Date.now() / 1000));
        DETAILS_RNG = createNumberGenerator(1);

        doodleFactor(4);

        R.lineWidth = 10;
        R.lineCap = R.lineJoin = nomangle('round');

        wrap(() => {
            translate(-this.camera.x, -this.camera.y);

            fs(linesBg);
            fr(this.camera.x, this.camera.y, CANVAS_WIDTH, CANVAS_HEIGHT);

            this.panels.forEach(p => {
                if (p.x > this.camera.x + CANVAS_WIDTH || p.x + p.panelWidth < this.camera.x) return;
                if (p.y > this.camera.y + CANVAS_HEIGHT || p.y + p.panelHeight < this.camera.y) return;
                p.render();
            });
        });
    }

}
