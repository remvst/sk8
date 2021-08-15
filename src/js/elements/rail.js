class Rail extends Element {

    constructor(points) {
        super();

        this.points = points;

        for (let i = 0 ; i < points.length ; i++) {
            const current = points[i];
            const nextPoint = points[i+1];

            // Link to next
            if (nextPoint) {
                this.renderables.push(new Segment(current, nextPoint));
            }

            // Link to ground
            this.renderables.push(new Segment(
                current,
                new Point(current.x, current.y, 0)
            ));
        }
    }
}
