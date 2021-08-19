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

canvasProto.whiteText = function(t, x, y, scale) {
    this.fatText('#fff', t, x, y, scale)
}

canvasProto.fatText = function(color, t, x, y, scale) {
    this.wrap(() => {
        this.translate(x, y);
        this.scale(scale, scale);

        this.font = nomangle('italic 72pt Impact');
        this.fs('#000');
        this.fillText(t, 0, 10);

        this.lineWidth = 4;
        this.fs(color);
        this.ss('#000');
        this.fillText(t, 0, 0);
        this.strokeText(t, 0, 0);
    });
};
