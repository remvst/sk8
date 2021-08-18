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

        wrap(() => {
            R.globalAlpha = 0.5;
            fs('#000');
            fr(0, CANVAS_HEIGHT, CANVAS_WIDTH, -200);
        });

        wrap(() => {
            fs('#fff');

            beginPath();
            arc(300, CANVAS_HEIGHT - 350, 100, 0, PI * 2);
            fill();

            R.lineWidth = 80;
            ss('#fff');
            beginPath();
            moveTo(300, CANVAS_HEIGHT - 350);
            lineTo(300, CANVAS_HEIGHT);
            moveTo(300, CANVAS_HEIGHT - 250);
            lineTo(400, CANVAS_HEIGHT - 50);
            moveTo(300, CANVAS_HEIGHT - 250);
            lineTo(200, CANVAS_HEIGHT - 50);
            stroke();

            R.font = '36pt Impact'
            R.textAlign = 'center';
            R.textBaseline = 'middle';

            const text = [
                nomangle('Let\'s start by gaining some speed.'),
                nomangle('Hold [SPACE] to push.'),
            ];

            const lineHeight = 50;
            let y = CANVAS_HEIGHT - 100 - text.length / 4 * lineHeight;

            text.forEach((line, i) => {
                fillText(line, 200 + (CANVAS_WIDTH - 200) / 2, y);
                y += lineHeight;
            });


            // fillText(nomangle('Let\'s start by gaining some speed. Press [SPACE] to start pushing'), CANVAS_WIDTH / 2, CANVAS_HEIGHT - 100);
            // fr(0, CANVAS_HEIGHT, CANVAS_WIDTH, -200);
        });
    }

    showMessage(message) {
        this.message = message;
        this.messageTimeLeft = 2;
    }
}
