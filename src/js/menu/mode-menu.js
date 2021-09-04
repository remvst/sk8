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
                    nomangle('FREE SKATE'),
                    () => G.startScene(new FreeScene()),
                ),
                mainMenuButton(640),
            ],
        );

        if (!document.monetization || document.monetization.state !== nomangle('started')) {
            setTimeout(() => G.startScene(new SessionScene()), 0);
        }
    }
}
