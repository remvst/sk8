class ModeMenu extends Menu {
    constructor() {
        super(
            nomangle('SELECT MODE'),
            [
                new Button(
                    nomangle('SINGLE SESSION'),
                    () => G.startScene(new SessionScene()),
                ),
                new Button(
                    nomangle('FREE SKATE (COIL ONLY)'),
                    () => G.startScene(new FreeScene()),
                ),
                mainMenuButton(640),
            ],
        );

        this.buttons[1].enabled = (document.monetization || {}).state == nomangle('started');
    }
}
