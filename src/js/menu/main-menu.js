class MainMenu extends Menu {
    constructor() {
        super();

        this.title = nomangle('STICK SKATER');

        this.buttons = [
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                400,
                nomangle('TUTORIAL'),
                () => G.startScene(new WelcomeScene()),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                520,
                nomangle('NEW SESSION'),
                () => G.setMenu(new ModeMenu()),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                640,
                nomangle('CHALLENGES'),
                () => G.challenges(),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                760,
                () => nomangle('GAME SPEED: ') + round(G.gameSpeed * 100) + '%',
                () => {
                    // this.speedButton
                    G.gameSpeed = roundToNearest(0.6 + ((G.gameSpeed - 0.6) + 0.1) % 0.5, 0.1);
                }
            )
        ];

        this.buttons[1].enabled = localStorage[nomangle('tut')];
    }
}
