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
    with (this) {
        wrap(() => {
            translate(x, y);
            scale(textScale, textScale);

            font = nomangle('italic 72pt Impact');
            fs('#000');
            fillText(t, 0, 10);

            lineWidth = lineThickness;
            fs(color);
            ss('#000');
            fillText(t, 0, 0);
            strokeText(t, 0, 0);
        });
    }
};
