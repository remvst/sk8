class Game {

    constructor() {
        G = this;
        G.clock = 0;

        G.scenes = [
            new WelcomeScene(),
            new PushScene(),
            new DirectionScene(),
            new JumpScene(),
            new TrickScene(),
            new GrindScene(),
            new RotationScene(),
            new FreeScene(),
        ];

        if (DEBUG) G.scene = G.scenes[4];
        G.nextScene();
    }

    startScene(scene) {
        this.scene = scene;
        scene.restart();
    }

    cycle(elapsed) {
        if (DEBUG && down[KEYBOARD_G]) elapsed *= 0.1;

        G.clock += elapsed;

        G.scene.cycle(elapsed);
        INTERPOLATIONS.forEach(x => x.cycle(elapsed));
    }

    render() {
        wrap(() => {
            fs('#170e65');
            fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            this.scene.render();
        });
    }

    nextScene() {
        INTERPOLATIONS = [];

        const index = G.scenes.indexOf(G.scene);
        this.startScene(this.scenes[index + 1]);
    }
}
