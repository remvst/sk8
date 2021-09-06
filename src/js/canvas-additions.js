const canvasProto = CanvasRenderingContext2D.prototype;

// A couple extra canvas functions
canvasProto.wrap = function(f) {
    this.save();
    f();
    this.restore();
};
canvasProto.fr = canvasProto.fillRect;
canvasProto.fs = function(x) {
    this.fillStyle = x;
};
canvasProto.ss = function(x) {
    this.strokeStyle = x;
};

canvasProto.whiteText = function(t, x, y, textScale, lineThickness) {
    this.fatText(COLOR_WHITE, t, x, y, textScale, lineThickness)
}

canvasProto.fatText = function(color, t, x, y, textScale, lineThickness = 4) {
    this.wrap(() => {
        this.translate(x, y);
        this.scale(textScale, textScale);

        this.font = nomangle('italic 72pt Impact');
        this.fs('#000');
        this.fillText(t, 0, 10);

        this.lineWidth = lineThickness;
        this.fs(color);
        this.ss('#000');
        this.fillText(t, 0, 0);
        this.strokeText(t, 0, 0);
    });
};
