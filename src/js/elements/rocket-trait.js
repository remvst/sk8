class RocketTrait extends Trait {
    get key() {
        return 'rocket'
    }

    render() {
        ss('#000');

        closedPath(() => {
            doodleFactor(2);

            R.lineWidth = 3;

            polygon(
                0, -150,
                40, -80,
                40, 80,
                80, 140,

                -80, 140,
                -40, 80,
                -40, -80,
            );

            fs('#ccc');
            fill();
        }).stroke();

        closedPath(() => {
            doodleFactor(2);

            R.lineWidth = 3;

            polygon(
                0, -150,
                40, -80,
                -40, -80,
            );

            fs('#f00');
            // fr(0, 0, 10, 10);
            fill();
        }).stroke();

        ss('#f80');
        path(() => {
            for (let i = 0 ; i < 5 ; i++) {
                const x = rnd(-80, 80);
                line(
                    x, 140,
                    x, 180,
                );
            }
        }).stroke();
    }
}
