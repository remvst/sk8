class EndMenu extends Menu {
    constructor(score) {
        super()

        this.title = nomangle('SCORE: ') + numberWithCommas(score);

        this.buttons = [
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                400,
                nomangle('TRY AGAIN'),
                () => G.startScene(new FreeScene()),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                520,
                nomangle('SHARE'),
                () => {}, // TODO
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                520,
                nomangle('MAIN MENU'),
                () => G.mainMenu(),
            ),
        ]
    }
}
