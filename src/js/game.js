class Game {

    constructor() {
        G = this;
        G.clock = 0;

        this.startScene(new IntroScene());
    }

    mainMenu() {
        G.startScene(new MenuScene());
        G.menu = new Menu();
    }

    startScene(scene) {
        this.menu = null;
        this.scene = scene;
        scene.restart();

        this.transition();
    }

    cycle(elapsed) {
        if (DEBUG && down[KEYBOARD_G]) elapsed *= 0.1;
        if (DEBUG && down[KEYBOARD_F]) elapsed *= 4;

        G.clock += elapsed;

        if (G.menu) G.menu.cycle(elapsed);
        if (G.clock > 1) G.scene.cycle(elapsed);
        INTERPOLATIONS.forEach(x => x.cycle(elapsed));
    }

    render() {
        wrap(() => this.scene.render());

        if (this.transitionProgress < 1) {
            wrap(() => {
                R.globalAlpha = 1 - this.transitionProgress;
                drawImage(this.transitionSnapshot, 0, 0);
            });
        }

        if (this.menu) {
            wrap(() => this.menu.render());
        }

        const fadeAlpha = limit(0, 1 - this.clock / 1, 1);
        wrap(() => {
            R.globalAlpha = fadeAlpha;
            fs('#000');
            fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        });

        wrap(() => {
            if (!document.pointerLockElement || this.scene.world.hero && this.scene.world.hero.input.userControlled) return;

            fs('#fff');
            ss('#000');
            R.lineWidth = 2;

            translate(MOUSE_POSITION.x, MOUSE_POSITION.y);
            rotate(PI / 3);
            beginPath();
            moveTo(0, 0);
            lineTo(40, 15);
            lineTo(30, 0);
            lineTo(40, -15);
            closePath();
            fill();
            stroke();
        });
    }

    transition() {
        this.transitionSnapshot = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, (r) => {
            r.drawImage(CANVAS, 0, 0);
        });

        interp(this, 'transitionProgress', 0, 1, 0.3);
    }
}
