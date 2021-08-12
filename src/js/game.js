DOODLE_RNG = createNumberGenerator(1);

// const scribbleBg = createCanvasPattern(CANVAS_WIDTH, CANVAS_HEIGHT, (r) => {
//     r.lineWidth = 40;
//     r.lineCap = r.lineJoin = 'round';
//
//     r.fs('#fff');
//     r.fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     // r.globalAlpha = 0.5;
//     r.ss('#080');
//     r.scribble(20, 20, CANVAS_WIDTH - 40, CANVAS_HEIGHT - 40, 1, 50);
// });

class Game {

    constructor() {
        G = this;
        G.clock = 0;
    }

    cycle(elapsed) {
        G.clock += elapsed;

        // TODO
    }

    render() {
        DOODLE_RNG = createNumberGenerator(~~(Date.now() / 500));
        DETAILS_RNG = createNumberGenerator(1);

        doodleFactor(4);

        fs('#fff');
        fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


        wrap(() => {
            doodleFactor(10);
            R.lineWidth = 40;
            R.lineCap = R.lineJoin = 'round';
            R.fs('#fff');
            R.fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            R.globalAlpha = 0.5;
            R.ss('#080');
            R.scribble(40, 40, CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80, 1, 50);
        });

        R.lineWidth = 10;
        R.lineCap = R.lineJoin = 'round';

        ss('#0f0');
        for (let i = 0 ; i < 10 ; i++) {
            path(() => {
                doodleFactor(20);
                translate(DETAILS_RNG.between(0, CANVAS_WIDTH), DETAILS_RNG.between(0, CANVAS_HEIGHT));
                line(-50, 0, 50, 0);
            }).stroke();
        }

        ss('#000');

        const leftOffsetY = sin(G.clock * PI * 4) * 5;
        const rightOffsetY = sin(G.clock * PI * 4) * -5;

        path(() => {
            translate(0, leftOffsetY);
            polygon(
                180, 240,
                180, 260,
                160, 260,
            );
        }).stroke();

        path(() => {
            translate(0, rightOffsetY);
            polygon(
                220, 240,
                220, 260,
                240, 260,
            );
        }).stroke();

        closedPath(() => {
            circle(200, 200, 50);

            fs('#f00');
            fill();
        }).stroke();

        const leftEyePosition = {'x': 180, 'y': 190};
        const rightEyePosition = {'x': 220, 'y': 190};
        const gunPosition = {'x': 200, 'y': 200};

        renderEye(leftEyePosition.x, leftEyePosition.y, 15, angleBetween(leftEyePosition, MOUSE_POSITION));
        renderEye(rightEyePosition.x, rightEyePosition.y, 15, angleBetween(rightEyePosition, MOUSE_POSITION));

        fs('#000');

        path(() => {
            doodleFactor(2);

            translate(gunPosition.x, gunPosition.y);

            const angle = angleBetween(gunPosition, MOUSE_POSITION);
            rotate(angle);

            if (cos(angle) < 0) {
                scale(1, -1);
            }

            rectangle(60, -15, 50, 10);
            rectangle(60, -5, 10, 10);
            fill();
        }).stroke();


        // closedPath(() => {
        //     R.lineWidth = 2;
        //     fs('#fff');
        //
        //     doodleFactor(2);
        //     circle(180, 190, 15);
        //     fill();
        // }).stroke();
        //
        // fs('#000');
        //
        // closedPath(() => {
        //     doodleFactor(2);
        //     circle(180, 190, 5);
        //     fill();
        // });
        //
        // closedPath(() => {
        //     R.lineWidth = 2;
        //     doodleFactor(2);
        //     circle(220, 190, 15);
        // }).stroke();
        //
        // closedPath(() => {
        //     doodleFactor(2);
        //     circle(220, 190, 5);
        //     fill();
        // });

        closedPath(() => {
            rectangle(300, 300, 200, 100);
        }).stroke();

        const animationTime = 2000;
        const prct = (Date.now() % animationTime) / animationTime;
        const penPosition = scribble(300, 300, 200, 100, prct);

        wrap(() => {
            translate(penPosition.x, penPosition.y);
            rotate(-PI / 8);
            fs('brown')

            R.lineWidth = 1;
            doodleFactor(0);

            closedPath(() => {
                polygon(
                    0, 0,
                    20, 10,
                    200, 10,
                    200, -10,
                    20, -10,
                );
                fill();
            }).stroke();
        });
    }

}
