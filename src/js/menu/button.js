class Button {
    constructor(x, y, label) {
        this.x = x;
        this.y = y;
        this.label = label;
    }

    render() {
        translate(this.x, this.y);

        // fs('#000');
        // fr(-5, -5, BUTTON_WIDTH + 10, BUTTON_HEIGHT + 10);
        //
        // fs('#fff');
        // fr(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT);

        R.globalAlpha *= this.contains(MOUSE_POSITION) ? 1 : 0.5;

        R.font = '36pt Impact';
        R.textAlign = nomangle('left');
        R.textBaseline = nomangle('middle');
        fs('#000');
        fillText(this.label, 0, BUTTON_HEIGHT / 2);
    }

    contains(pt) {
        return between(this.x, pt.x, this.x + BUTTON_WIDTH) && between(this.y, pt.y, this.y + BUTTON_HEIGHT);
    }
}
