class EndMenu extends Menu {
    constructor(score) {
        super(
            nomangle('SCORE: ') + numberWithCommas(score),
            [
                new Button(
                    nomangle('TRY AGAIN'),
                    () => G.startScene(new SessionScene()),
                ),
                new Button(
                    nomangle('SHARE'),
                    () => tweet([
                        nomangle('I scored '),
                        numberWithCommas(score),
                        nomangle('pts on STICK SKATER'),
                    ].join('')),
                ),
                challengesButton(),
                mainMenuButton(),
            ],
        );
    }
}
