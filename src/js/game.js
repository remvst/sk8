class Game {

    constructor() {
        G = this;
        G.clock = 0;

        G.camera = new Camera();

        G.world = new World();

        INTERPOLATIONS = [];
    }

    startPanel(panel) {
        this.currentPanel = panel;
        panel.restart();
    }

    cycle(elapsed) {
        G.clock += elapsed;

        G.world.cycle(elapsed);
        INTERPOLATIONS.forEach(x => x.cycle(elapsed));

        // TODO
    }

    render() {
        wrap(() => {
            fs('#fff');
            fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            translate(-this.camera.x, -this.camera.y);

            G.world.render();
        });
    }

}
