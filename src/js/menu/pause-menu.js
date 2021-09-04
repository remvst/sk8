class PauseMenu extends Menu {
    constructor() {
        super();

        this.title = nomangle('GAME PAUSED');

        this.buttons = [
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                400,
                nomangle('RESUME'),
                () => G.setMenu(null),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                520,
                () => nomangle('CHALLENGES'),
                () => G.challenges(),
            ),
            gameSpeedButton(640),
            mainMenuButton(760),
        ];
    }
}
