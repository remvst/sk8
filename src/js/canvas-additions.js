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

canvasProto.whiteText = function(t, x, y, textScale) {
    this.fatText('#fff', t, x, y, textScale)
}

canvasProto.fatText = function(color, t, x, y, textScale) {
    with (this) {
        wrap(() => {
            translate(x, y);
            scale(textScale, textScale);

            font = nomangle('italic 72pt Impact');
            fs('#000');
            fillText(t, 0, 10);

            lineWidth = 4;
            fs(color);
            ss('#000');
            fillText(t, 0, 0);
            strokeText(t, 0, 0);
        });
    }
};
