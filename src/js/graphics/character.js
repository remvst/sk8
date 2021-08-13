canvasProto.renderEye = function(x, y, radius, angle) {
    this.wrap(() => {
        this.doodleFactor(2);

        this.closedPath(() => {
            R.lineWidth = 2;
            this.fs('#fff');

            this.doodleFactor(2);
            this.circle(x, y, radius);
            this.fill();
        }).stroke();

        this.fs('#000');

        this.closedPath(() => {
            this.circle(
                x + Math.cos(angle) * radius / 3,
                y + Math.sin(angle) * radius / 3,
                radius / 3,
            );
            this.fill();
        });
    });
};

canvasProto.leg = function(x, y) {
    this.path(() => {
        // this.translate(0, rightOffsetY);
        this.polygon(
            0, 0,
            0, 20,
            20, 20,
        );
    }).stroke();
};

canvasProto.legs = function(x, y, spacing, walkingClock) {
    [1, -1].forEach((sign) => this.wrap(() => {
        const offsetY = sin(walkingClock * PI * 4) * 5 * sign;

        // this.fs();

        this.translate(x + spacing * sign, y + offsetY);
        this.scale(sign, 1);
        this.leg(0, 0);
    }));
};
