class Menu {

    constructor() {
        this.age = 0;
        this.buttons = [
            new Button(
                (MENU_WIDTH - BUTTON_WIDTH) / 2,
                300,
                'PLAY THE TUTORIAL',
            ),
            new Button(
                (MENU_WIDTH - BUTTON_WIDTH) / 2,
                400,
                'ENTER THE CONTEST',
            ),
        ];
    }

    cycle(elapsed) {
        this.age += elapsed;
    }

    get animationRatio() {
        return limit(0, this.age / 0.3, 1)
    }

    render() {
        translate(-(1 - this.animationRatio) * MENU_WIDTH, 0);
        // R.globalAlpha = 1 - this.animationRatio;

        fs('#fff');
        fr(0, 0, MENU_WIDTH, CANVAS_HEIGHT);

        R.font = nomangle('italic 72pt Impact');
        R.textAlign = nomangle('center');
        R.textBaseline = nomangle('middle');
        fs('#000');
        fillText(nomangle('STICK SKATER'), MENU_WIDTH / 2, 100);

        this.buttons.forEach(x => wrap(() => x.render()));
    }

}
