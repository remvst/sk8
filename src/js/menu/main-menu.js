class MainMenu extends Menu {
    constructor() {
        super()

        this.title = nomangle('STICK SKATER');

        this.buttons = [
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                400,
                'PLAY THE TUTORIAL',
                () => G.startScene(new WelcomeScene()),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                520,
                'ENTER THE CONTEST',
                () => G.startScene(new FreeScene()),
            ),
        ]
    }
}
