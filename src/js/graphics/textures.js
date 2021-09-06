groundTexture = createCanvasPattern(150, 150, (x) => {
    x.globalAlpha = 0.1;
    x.fs(COLOR_WHITE);
    x.translate(-2, -2);
    x.fr(evaluate(150 / 2), 0, 10, 10);
    x.fr(evaluate(150 / 2), 150, 10, 10);
    x.fr(0, evaluate(150 / 2), 10, 10);
    x.fr(150, evaluate(150 / 2), 10, 10);
});
