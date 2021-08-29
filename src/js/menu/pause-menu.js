class PauseMenu extends Menu {
    constructor() {
        super();

        this.title = nomangle('GAME PAUSED');

        this.buttons = [
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                400,
                nomangle('RESUME'),
                () => {
                    G.transition();
                    G.menu = null;
                },
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                520,
                () => nomangle('CHALLENGES'),
                () => G.challenges(),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                640,
                () => nomangle('GAME SPEED: ') + round(G.gameSpeed * 100) + '%',
                () => G.gameSpeed = roundToNearest(0.6 + ((G.gameSpeed - 0.6) + 0.1) % 0.5, 0.1),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                760,
                nomangle('MAIN MENU'),
                () => G.mainMenu(),
            ),
        ];
    }
}
