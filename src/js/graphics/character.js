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
