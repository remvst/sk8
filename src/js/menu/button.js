class Button {
    constructor(x, y, label, onClick) {
        this.x = x;
        this.y = y;
        this.label = label;
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

        R.font = '36pt Impact';
        R.textAlign = nomangle('center');
        R.textBaseline = nomangle('middle');
        fs('#fff');
        fillText(this.label, BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);
    }

    contains(pt) {
        return between(this.x, pt.x, this.x + BUTTON_WIDTH) && between(this.y, pt.y, this.y + BUTTON_HEIGHT);
    }
}
