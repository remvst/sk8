class Menu {

    constructor(menuTitle, buttons) {
        this.age = 0;
        this.menuTitle = menuTitle;
        this.buttons = buttons;
        this.buttons.forEach((button, i) => {
            button.y = 400 + i * evaluate(BUTTON_HEIGHT + BUTTON_SPACING);
        });
    }

    cycle(elapsed) {
        this.age += elapsed;
    }

    get animationRatio() {
        return limit(0, this.age / 0.3, 1)
    }

    render() {
        R.globalAlpha = this.animationRatio;
        R.textAlign = nomangle('center');
        R.textBaseline = nomangle('middle');

        whiteText(this.menuTitle, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4, 2);

        this.buttons.forEach(x => wrap(() => x.render()));
    }

}
