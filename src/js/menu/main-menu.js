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
            challengesButton(640),
            gameSpeedButton(760),
        ];

        this.buttons[1].enabled = localStorage[nomangle('tut')];
    }
}
