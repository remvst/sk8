class MainMenu extends Menu {
    constructor() {
        super(
            DOCUMENT.title,
            [
                new Button(
                    nomangle('TUTORIAL'),
                    () => G.startScene(new WelcomeScene()),
                ),
                new Button(
                    nomangle('NEW SESSION'),
                    () => G.setMenu(new ModeMenu()),
                ),
                challengesButton(640),
                gameSpeedButton(760),
            ],
        );

        this.buttons[1].enabled = localStorage[nomangle('tut')];
    }
}
