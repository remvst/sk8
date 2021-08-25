groundTexture = createCanvasPattern(150, 150, (r, c) => {
    r.globalAlpha = 0.1;
    r.fs('#fff');
    r.translate(-2, -2);
    r.fr(c.width / 2, 0, 10, 10);
    r.fr(c.width / 2, c.height, 10, 10);
    r.fr(0, c.height / 2, 10, 10);
    r.fr(c.width, c.height / 2, 10, 10);
});

tapeTexture = createCanvasPattern(100, 50, (r, c) => {
    r.fs('#000');
    r.fr(0, 0, 100, 50);

    r.fs('#fff');
    r.beginPath();
    r.arc(25, 25, 12, 0, TWO_PI);
    r.arc(75, 25, 12, 0, TWO_PI);
    // r.fr(0, 0, 10, 10);
    r.fill();
});
