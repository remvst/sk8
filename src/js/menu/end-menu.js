class EndMenu extends Menu {
    constructor(score) {
        super()

        this.title = nomangle('SCORE: ') + numberWithCommas(score);

        this.buttons = [
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                400,
                nomangle('TRY AGAIN'),
                () => G.startScene(new SessionScene()),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                520,
                nomangle('SHARE'),
                () => tweet([
                    nomangle('I scored '),
                    numberWithCommas(score),
                    nomangle('pts on STICK SKATER'),
                ].join('')),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                640,
                nomangle('CHALLENGES'),
                () => G.challenges(),
            ),
            mainMenuButton(760),
        ]
    }
}
