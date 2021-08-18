groundTexture = createCanvasPattern(400, 160, (r, c) => {
    r.ss('#fff');
    r.globalAlpha = 0.1;
    r.lineWidth = 8;
    r.beginPath();
    r.moveTo(0, 0);
    r.lineTo(c.width, c.height);
    r.moveTo(c.width, 0);
    r.lineTo(0, c.height);
    r.stroke();
});
