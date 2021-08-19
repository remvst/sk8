class HUD {

    constructor(scene) {
        this.scene = scene;
        this.messageTimeLeft = 0;
        this.displayedScore = 0;
        this.targetScore = 0;
    }

    cycle(elapsed) {
        this.messageTimeLeft -= elapsed;

        if (this.targetScore != this.scene.score) {
            this.targetScore = this.scene.score;
            interp(this, 'displayedScore', this.displayedScore, this.targetScore, 0.5);
        }
    }

    render() {
        R.font = 'italic 72pt Impact';
        R.textAlign = 'center';
        R.textBaseline = 'top';

        if (this.scene.timeLeft !== null) {
            whiteText(formatTime(this.scene.timeLeft), CANVAS_WIDTH / 2, 50, 1);
        }

        const { hero } = this.scene.world;
        if (hero && hero.comboTracker.combo.tricks.length) {
            const { combo } = hero.comboTracker;
            const tricks = combo.tricks.slice(-5).map(trickToString).join(' + ');

            R.textBaseline = 'bottom';
            whiteText(numberWithCommas(combo.base) + nomangle('  x  ') + combo.tricks.length, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 200, 0.5);

            R.textBaseline = 'top';
            whiteText(tricks, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 200, 0.4);
        }

        R.textBaseline = 'top';
        R.textAlign = 'left';
        whiteText(nomangle('SCORE'), 50, 50, 0.5);
        whiteText(numberWithCommas(~~this.displayedScore), 50, 100, 1);

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
        this.messageLines = messageLines.splice ? messageLines : [messageLines];
        this.messageTimeLeft = messageDuration;
    }

    setPermanentMessage(messageLines) {
        this.permanentMessage = messageLines.splice ? messageLines : [messageLines];
    }
}
