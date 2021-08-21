class Game {

    constructor() {
        G = this;
        G.clock = 0;

        this.lastHudMessage = null;

        this.startScene(new IntroScene());
        this.transition('#000', 1);
    }

    mainMenu() {
        G.startScene(new MenuScene());
        G.menu = new MainMenu();
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
        G.scene.cycle(elapsed);
        INTERPOLATIONS.forEach(x => x.cycle(elapsed));

        if (G.scene.hud.messageLines != this.lastHudMessage) {
            say(G.scene.hud.messageLines.join(''));
        }
        this.lastHudMessage = G.scene.hud.messageLines;
    }

    render() {
        wrap(() => this.scene.render());

        if (this.transitionProgress < 1) {
            wrap(() => {
                R.globalAlpha = 1 - this.transitionProgress;
                fs(this.transitionPattern);
                fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            });
        }

        if (this.menu) {
            wrap(() => this.menu.render());
        }

        // const fadeAlpha = limit(0, 1 - this.clock / 1, 1);
        // wrap(() => {
        //     R.globalAlpha = fadeAlpha;
        //     fs('#000');
        //     fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // });

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

    transition(pattern, duration = 0.3) {
        this.transitionPattern = pattern || createCanvasPattern(CANVAS_WIDTH, CANVAS_HEIGHT, (r) => {
            r.drawImage(CANVAS, 0, 0);
        });

        interp(this, 'transitionProgress', 0, 1, 0.3);
    }
}
