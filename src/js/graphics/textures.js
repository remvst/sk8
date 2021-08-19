groundTexture = createCanvasPattern(150, 150, (r, c) => {
    r.globalAlpha = 0.1;
    r.fs('#fff');
    r.translate(-2, -2);
    r.fr(c.width / 2, 0, 10, 10);
    r.fr(c.width / 2, c.height, 10, 10);
    r.fr(0, c.height / 2, 10, 10);
    r.fr(c.width, c.height / 2, 10, 10);
});
