class HUD {

    constructor() {
        this.messageTimeLeft = 0;
    }

    cycle(elapsed) {
        this.messageTimeLeft -= elapsed;
    }

    render() {
        const lines = this.messageTimeLeft > 0 ? this.messageLines : this.permanentMessage;
        if (lines && lines.length) {
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

                const lineHeight = 50;
                let y = CANVAS_HEIGHT - 100 - lines.length / 4 * lineHeight;

                lines.forEach((line, i) => {
                    fillText(line, 200 + (CANVAS_WIDTH - 200) / 2, y);
                    y += lineHeight;
                });
            });
        }
    }

    showMessage(messageLines, messageDuration = 2) {
        this.messageLines = messageLines.slice ? messageLines : [messageLines];
        this.messageTimeLeft = messageDuration;
    }

    setPermanentMessage(messageLines) {
        this.permanentMessage = messageLines;
    }
}
