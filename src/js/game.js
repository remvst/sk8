DOODLE_RNG = createNumberGenerator(1);

const scribbleBg = createCanvasPattern(CANVAS_WIDTH, CANVAS_HEIGHT, (r) => {
    r.lineWidth = 40;
    r.lineCap = r.lineJoin = 'round';

    r.fs('#fff');
    r.fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // r.globalAlpha = 0.5;
    r.ss('#000');
    r.scribble(20, 20, CANVAS_WIDTH - 40, CANVAS_HEIGHT - 40, 1, 50);

    const grad = r.createRadialGradient(0, 0, 0, 0, 0, 200);
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(0.75, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    r.globalCompositeOperation = 'destination-out';
    r.fs(grad);
    // r.path(() => {
    //     r.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    //     r.arc(0, 0, 200, 0, PI * 2);
    //     r.fill();
    // });

    r.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    r.fr(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);
});

class Game {

    constructor() {
        G = this;
        G.clock = 0;

        G.panels = [
            new IntroPanel(50, 50, 1500, 700),
        ];
        G.panels[0].start();
    }

    cycle(elapsed) {
        G.clock += elapsed;

        this.panels.forEach(p => p.cycle(elapsed));

        // TODO
    }

    render() {
        DOODLE_RNG = createNumberGenerator(~~(Date.now() / 1000));
        DETAILS_RNG = createNumberGenerator(1);

        doodleFactor(4);

        R.lineWidth = 10;
        R.lineCap = R.lineJoin = nomangle('round');

        fs('#fff');
        fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

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
    }

}
