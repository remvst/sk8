class ChallengesMenu extends Menu {
    constructor(score) {
        const previousMenu = G.menu;
        super(
            nomangle('CHALLENGES: ') + CHALLENGES.filter(x => x.wasCompleted()).length + '/' + CHALLENGES.length,
            [
                new Button(
                    nomangle('BACK'),
                    () => {
                        G.transition();
                        G.setMenu(previousMenu);
                    },
                )
            ],
        );
        this.buttons[0].y = 700;
    }

    render() {
        super.render();

        CHALLENGES.forEach((challenge, i) => {
            const row = i % 4;
            const col = floor(i / 4);

            wrap(() => {
                translate(
                    (col + 1) * CANVAS_WIDTH / 5 - CHALLENGE_BUTTON_WIDTH / 2,
                    row * (CHALLENGE_BUTTON_HEIGHT + 10) + 400,
                );

                R.globalAlpha *= challenge.wasCompleted() ? 1 : 0.5;
                fs('#000');
                fr(0, 0, CHALLENGE_BUTTON_WIDTH, CHALLENGE_BUTTON_HEIGHT);

                R.font = nomangle('24pt Impact');
                R.textAlign = nomangle('center');
                R.textBaseline = nomangle('middle');
                fs('#fff');
                fillText(challenge.label, CHALLENGE_BUTTON_WIDTH / 2, CHALLENGE_BUTTON_HEIGHT / 2);
            });
        });
    }
}
