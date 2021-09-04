class PauseMenu extends Menu {
    constructor() {
        super(
            nomangle('GAME PAUSED'),
            [
                new Button(
                    nomangle('RESUME'),
                    () => G.setMenu(null),
                ),
                new Button(
                    nomangle('RESTART'),
                    () => G.startScene(G.scene),
                ),
                challengesButton(520),
                gameSpeedButton(640),
                mainMenuButton(760),
            ],
        );
    }
}
