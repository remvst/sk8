canvasProto.moveToDoodled = function(x, y) {
    this.moveTo.call(this, this.doodlize(x), this.doodlize(y));
};

canvasProto.lineToDoodled = function(x, y) {
    this.lineTo.call(this, this.doodlize(x), this.doodlize(y));
};

canvasProto._doodleFactor = [0];
canvasProto.doodleFactor = function(x) {
    this._doodleFactor[this._doodleFactor.length - 1] = x;
};
canvasProto.currentDoodleFactor = function() {
    return this._doodleFactor[this._doodleFactor.length - 1] || 0;
};
canvasProto.doodlize = function(x) {
    return x + DOODLE_RNG.between(-this.currentDoodleFactor(), this.currentDoodleFactor());
};

canvasProto.path = function(f) {
    this.wrap(() => {
        this.beginPath();
        f();
    });
    return this;
};

canvasProto.closedPath = function(f) {
    return this.path(() => {
        f();
        this.closePath();
    });
};

canvasProto.line = function(x1, y1, x2, y2) {
    const step = 20 / distP(x1, y1, x2, y2);

    this.lineToDoodled(x1, y1);

    for (let k = step ; k < 1 ; k += step) {
        this.lineToDoodled(
            k * (x2 - x1) + x1,
            k * (y2 - y1) + y1,
        );
    }

    this.lineToDoodled(x2, y2);
};

canvasProto.rectangle = function(x, y, w, h) {
    this.polygon(
        x, y,
        x + w, y,
        x + w, y + h,
        x, y + h,
        x, y,
    );
};

canvasProto.polygon = function(...coords) {
    this.moveTo(coords[0], coords[1]);

    for (let i = 0 ; i < coords.length - 2 ; i += 2) {
        this.line(
            coords[i], coords[i + 1],
            coords[i + 2], coords[i + 3],
        );
    }
};

canvasProto.circle = function(x, y, r) {
    for (let i = 0 ; i < 10 ; i++) {
        const a = i / 10 * PI * 2;
        this.lineToDoodled(
            x + cos(a) * r,
            y + sin(a) * r,
        );
    }
};

canvasProto.scribble = function(x, y, w, h, targetLength = 1, factor = 20) {
    const diagLength = distP(0, 0, w, h);
    const slope = tan(-PI / 3);

    let sign = 1;
    let remainingLength = targetLength;

    let prevX = x,
        prevY = y;

    const step = factor / diagLength;

    this.wrap(() => this.path(() => {
        for (let k = 0 ; remainingLength > 0 ; k += step) {
            const diagX = x + k * w;
            const diagY = y + k * h;

            let targetY = sign < 0 ? y + h : y;
            let targetX = (targetY - diagY) / slope + diagX;

            if (!between(x, targetX, x + w)) {
                targetX = limit(x, targetX, x + w);
                targetY = slope * (targetX - diagX) + diagY;
            }

            const addedLength = min(remainingLength, step);
            remainingLength -= addedLength;

            targetX = prevX + (addedLength / step) * (targetX - prevX);
            targetY = prevY + (addedLength / step) * (targetY - prevY);

            this.lineToDoodled(targetX, targetY);

            prevX = targetX;
            prevY = targetY;

            sign *= -1;
        }

    }).stroke());

    return {'x': prevX, 'y': prevY};
};
