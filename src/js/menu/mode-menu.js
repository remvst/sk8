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
                    () => G.startScene(new ParkScene()),
                ),
                mainMenuButton(640),
            ],
        );

        this.menuButtons[1].enabled = (DOCUMENT.monetization || {}).state == nomangle('started');
    }
}
