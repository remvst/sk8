groundTexture = createCanvasPattern(150, 150, (r) => {
    with (r) {
        globalAlpha = 0.1;
        fs('#fff');
        translate(-2, -2);
        fr(evaluate(150 / 2), 0, 10, 10);
        fr(evaluate(150 / 2), 150, 10, 10);
        fr(0, evaluate(150 / 2), 10, 10);
        fr(150, evaluate(150 / 2), 10, 10);
    }
});
