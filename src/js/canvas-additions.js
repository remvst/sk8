const canvasProto = CanvasRenderingContext2D.prototype;

// A couple extra canvas functions
canvasProto.wrap = function(f) {
    this.save();
    canvasProto._doodleFactor.push(this.currentDoodleFactor());
    f();
    this.restore();
    if (canvasProto._doodleFactor.length > 1) canvasProto._doodleFactor.pop();
};
canvasProto.fr = canvasProto.fillRect;
canvasProto.fs = function(x) {
    this.fillStyle = x;
};
canvasProto.ss = function(x) {
    this.strokeStyle = x;
};
