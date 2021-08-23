class MainMenu extends Menu {
    constructor() {
        super()

        this.title = nomangle('STICK SKATER');

        this.buttons = [
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                400,
                nomangle('PLAY THE TUTORIAL'),
                () => G.startScene(new WelcomeScene()),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                520,
                nomangle('NEW SESSION'),
                () => G.startScene(new FreeScene()),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                640,
                nomangle('CHALLENGES'),
                () => G.challenges(),
            ),
        ];

        this.buttons.forEach((x, i) => {
            x.enabled = !i || localStorage[nomangle('tut')];
        });
    }
}
