class HUD {

    constructor() {
        this.messageTimeLeft = 0;
    }

    cycle(elapsed) {
        this.messageTimeLeft -= elapsed;
    }

    render() {
        if (this.messageTimeLeft > 0) {
            wrap(() => {
                R.font = nomangle('italic 72pt Impact');
                R.textAlign = nomangle('center');
                R.textBaseline = nomangle('middle');
                R.lineWidth = 2;

                fs('#000');
                fillText(this.message, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4 + 10);

                ss('#000');
                fs('#fff');
                fillText(this.message, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
                strokeText(this.message, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
            });
        }
    }

    showMessage(message) {
        this.message = message;
        this.messageTimeLeft = 2;
    }
}
