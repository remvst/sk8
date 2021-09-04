class PauseMenu extends Menu {
    constructor() {
        super(
            nomangle('GAME PAUSED'),
            [
                new Button(
                    nomangle('RESUME'),
                    () => G.setMenu(null),
                ),
                challengesButton(520),
                gameSpeedButton(640),
                mainMenuButton(760),
            ],
        );
    }
}
