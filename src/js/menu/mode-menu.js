class ModeMenu extends Menu {
    constructor() {
        super();

        this.title = nomangle('SELECT MODE');

        this.buttons = [
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                400,
                nomangle('SINGLE SESSION'),
                () => G.startScene(new SessionScene()),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                520,
                nomangle('FREE SKATE'),
                () => G.startScene(new FreeScene()),
            ),
            new Button(
                (CANVAS_WIDTH - BUTTON_WIDTH) / 2,
                640,
                nomangle('MAIN MENU'),
                () => G.mainMenu(),
            ),
        ];

        // if (!document.monetization || document.monetization.state !== nomangle('started')) {
        //     setTimeout(() => G.startScene(new SessionScene()), 0);
        // }
    }
}
