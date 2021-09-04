class Button {
    constructor(label, onClick) {
        this.x = evaluate(CANVAS_WIDTH / 2 - BUTTON_WIDTH / 2);
        this.y = 0;
        this.label = label.call ? label : () => label;
        this.onClick = onClick;
        this.enabled = true;
    }

    render() {
        translate(this.x, this.y);

        if (!this.enabled) {
            R.globalAlpha *= 0.5;
        }

        wrap(() => {
            R.globalAlpha *= this.contains(MOUSE_POSITION) ? 1 : 0.5;

            fs('#000');
            fr(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);
        });

        R.font = nomangle('36pt Impact');
        R.textAlign = nomangle('center');
        R.textBaseline = nomangle('middle');
        fs('#fff');
        fillText(this.label(), BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);
    }

    contains(pt) {
        return this.enabled && between(this.x, pt.x, this.x + BUTTON_WIDTH) && between(this.y, pt.y, this.y + BUTTON_HEIGHT);
    }
}

mainMenuButton = () => new Button(
    nomangle('MAIN MENU'),
    () => G.mainMenu(),
);

gameSpeedButton = () => new Button(
    () => nomangle('GAME SPEED: ') + round(G.gameSpeed * 100) + '%',
    () => G.gameSpeed = roundToNearest(0.6 + ((G.gameSpeed - 0.6) + 0.9) % 0.5, 0.1),
);

challengesButton = () => new Button(
    () => nomangle('CHALLENGES'),
    () => G.challenges(),
);
