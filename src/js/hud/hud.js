class HUD {

    constructor(scene) {
        this.scene = scene;
        this.messageTimeLeft = 0;
        this.displayedScore = 0;
        this.targetScore = 0;
        this.messageLines = [];
    }

    cycle(elapsed) {
        this.messageTimeLeft -= elapsed;

        if (this.targetScore != this.scene.score) {
            this.targetScore = this.scene.score;
            interp(this, 'displayedScore', this.displayedScore, this.targetScore, 0.5);
        }
    }

    renderCombo(combo, color, fadeOutRatio) {
        if (!combo || !combo.tricks.length || fadeOutRatio > 1) return;

        const adjusted = limit(0, (fadeOutRatio - 0.5) / 0.5, 1);

        R.globalAlpha = 1 - adjusted;

        translate(0, -adjusted * 50);

        R.textBaseline = nomangle('bottom');
        fatText(color, numberWithCommas(combo.base) + nomangle('  x  ') + tricks.length, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 200, 0.5);

        R.textBaseline = nomangle('top');
        fatText(color, combo.stringRecap, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 200, 0.4);
    }

    render() {
        R.font = 'italic 72pt Impact';
        R.textAlign = 'center';
        R.textBaseline = 'top';

        if (this.scene.timeLeft >= 0) {
            fatText(
                this.scene.timeLeft > 15 ? '#fff' : '#f00',
                formatTime(this.scene.timeLeft),
                CANVAS_WIDTH / 2,
                50,
                1,
            );
        }

        const { hero } = this.scene.world;
        if (hero && hero.input.userControlled) {
            wrap(() => this.renderCombo(
                hero.comboTracker.lastCombo,
                hero.comboTracker.lastCombo.landed ? '#0f0' : '#f00',
                (this.scene.world.age - hero.comboTracker.lastComboAge) / 1,
            ));
            wrap(() => this.renderCombo(
                hero.comboTracker.combo,
                '#fff',
                0,
            ));
        }

        if (this.scene.score >= 0) {
            R.textBaseline = 'top';
            R.textAlign = 'left';
            whiteText(nomangle('SCORE'), 50, 50, 0.5);
            whiteText(numberWithCommas(~~this.displayedScore), 50, 100, 1);
        }

        if (this.messageTimeLeft > 0) {
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

                const { messageLines } = this;

                const lineHeight = 50;
                let y = CANVAS_HEIGHT - 100 - messageLines.length / 4 * lineHeight;

                messageLines.forEach((line, i) => {
                    whiteText(line, 200 + (CANVAS_WIDTH - 200) / 2, y, 0.5);
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
        this.showMessage(messageLines, 999);
    }
}
