DOODLE_RNG = createNumberGenerator(1);

const linesBg = createCanvasPattern(20, 50, (r) => {
    r.fs('#fff');
    r.fr(0, 0, 99, 99);

    r.globalAlpha = 0.25;
    r.fs('#000');
    r.fr(0, 0, 50, 1);
});

class Game {

    constructor() {
        G = this;
        G.clock = 0;

        G.camera = new Camera();

        G.panels = [
            new IntroPanel(50, 50, 1000, 700),
            new TestPanel(1100, 50, 1000, 700),
            new TravellingPanel(50, 800, 500, 700),
            new LandingPanel(600, 800, 1500, 700),
            new Panel(50, 1600, 1500, 700),
        ];
        this.startPanel(G.panels[0]);

        INTERPOLATIONS = [];
        G.panels[0].focus(0);
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

            fs('blue');
            for (let i = 0 ; i < 10 ; i++) {
                path(() => {
                    translate(DETAILS_RNG.between(0, CANVAS_WIDTH), DETAILS_RNG.between(0, CANVAS_HEIGHT));

                    R.globalAlpha = DETAILS_RNG.between(0.1, 0.5);
                    arc(0, 0, DETAILS_RNG.between(5, 20), 0, PI * 2);
                    fill()
                });
            }

            this.panels.forEach(p => p.render());
        });
    }

}
