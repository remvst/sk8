class Kicker extends Element {

    constructor() {
        super();

        this.length = 200;
        this.height = 400;
        this.radius = this.length / 2;

        this.leftTop = this.newPoint();
        this.leftBottom = this.newPoint();
        this.rightTop = this.newPoint();
        this.rightBottom = this.newPoint();
        this.highTop = this.newPoint();
        this.highBottom = this.newPoint();


        this.renderables = [
            new Segment(this.leftTop, this.leftBottom, '#000', 8),
            new Segment(this.rightTop, this.rightBottom, '#000', 8),
            // new Segment(this.leftTop, this.rightTop),
            // new Segment(this.leftBottom, this.rightBottom),
            new Segment(this.highTop, this.highBottom, '#000', 8),
            new Segment(this.leftTop, this.highTop, '#000', 8),
            new Segment(this.leftBottom, this.highBottom, '#000', 8),
            new Segment(this.highTop, this.rightTop, '#000', 8),
            new Segment(this.highBottom, this.rightBottom, '#000', 8),

            new Plane([this.leftTop, this.highTop, this.highBottom, this.leftBottom]),

            // new Disk(this.edgeCenter(), 10),
        ];
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        this.world.elements.forEach(element => {
            if (element instanceof Hero && this.contains(element)) {
                const relative = this.relativePosition(element);
                const progress = 1 - (this.radius - relative.x) / this.length;
                const kickerZ = progress * this.height;

                if (element.z < kickerZ) {
                    element.z = kickerZ;
                    element.velocityZ = Math.max(element.velocityZ, 0);
                }
            }
        });
    }

    contains(pos) {
        const relative = this.relativePosition(pos);
        return between(-this.radius, relative.x, this.radius) &&
            between(-this.radius, relative.y, this.radius);
    }

    get minY() {
        return this.y - this.radius;
    }

    distanceToEdge(pos) {
        // const distance = dist(pos, this.edgeCenter());
        const distance = 9999;
        const angleToPos = Math.atan2(pos.y - this.edgeCenter().y, pos.x - this.edgeCenter().x)

        const angle = Math.atan2(pos.y - this.edgeCenter().y, pos.x - this.edgeCenter().x) - this.angle;
        const distanceToEdge = Math.cos(angle) * distance;
        return distanceToEdge;
    }

    relativePosition(pos) {
        const pt = new Point(pos.x, pos.y, pos.z);
        pt.x -= this.x;
        pt.y -= this.y;
        pt.z -= this.z;

        const rotated = new Point();
        rotated.x = pt.x * Math.cos(this.angle) + pt.y * Math.sin(this.angle);
        rotated.y = -pt.x * Math.sin(this.angle) + pt.y * Math.cos(this.angle);

        return rotated;
    }

    edgeCenter() {
        return new Point(this.x + Math.cos(this.angle) * 25, this.y + Math.sin(this.angle) * 25);
    }

    updateRenderables() {
        const animationRatio = (Date.now() % 5000) / 5000;
        const angle = this.angle;

        const radius = this.length / 2;

        this.leftTop.set(-radius, -radius, 0);
        this.leftBottom.set(-radius, radius, 0);
        this.rightTop.set(radius, -radius, 0);
        this.rightBottom.set(radius, radius, 0);
        this.highTop.set(radius, -radius, this.height);
        this.highBottom.set(radius, radius, this.height);

        this.adjustPoints();
    }
}
