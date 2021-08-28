class ChallengeButton {
    constructor(x, y, challenge) {
        this.x = x;
        this.y = y;
        this.challenge = challenge;
    }

    render() {
        translate(this.x, this.y);

        wrap(() => {
            R.globalAlpha *= this.challenge.wasCompleted() ? 1 : 0.5;

            fs('#000');
            fr(0, 0, CHALLENGE_BUTTON_WIDTH, CHALLENGE_BUTTON_HEIGHT);
        });

        R.font = nomangle('24pt Impact');
        R.textAlign = nomangle('center');
        R.textBaseline = nomangle('middle');
        fs('#fff');
        fillText(this.challenge.label, CHALLENGE_BUTTON_WIDTH / 2, CHALLENGE_BUTTON_HEIGHT / 2);
    }
}
