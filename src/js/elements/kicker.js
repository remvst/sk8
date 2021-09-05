class Kicker extends Element {

    constructor() {
        super();

        this.kickerLength = 200;
        this.kickerHeight = 200;
        this.radius = this.kickerLength / 2;

        this.leftTop = this.newPoint();
        this.leftBottom = this.newPoint();
        this.rightTop = this.newPoint();
        this.rightBottom = this.newPoint();
        this.highTop = this.newPoint();
        this.highBottom = this.newPoint();

        this.renderables = [
            segment(this.leftTop, this.leftBottom, COLOR_WHITE, 8),
            segment(this.rightTop, this.rightBottom, COLOR_WHITE, 8),
            segment(this.highTop, this.highBottom, COLOR_WHITE, 8),
            segment(this.leftTop, this.highTop, COLOR_WHITE, 8),
            segment(this.leftBottom, this.highBottom, COLOR_WHITE, 8),
            segment(this.highTop, this.rightTop, COLOR_WHITE, 8),
            segment(this.highBottom, this.rightBottom, COLOR_WHITE, 8),

            new Plane([this.leftTop, this.highTop, this.highBottom, this.leftBottom], '#ccc'),
        ];
    }

    transformed(transform) {
        const pt = transform(point(this.x, this.y));
        const ptForward = transform(point(this.x + cos(this.angle), this.y + sin(this.angle)));

        const kicker = new Kicker();
        kicker.x = pt.x;
        kicker.y = pt.y;
        kicker.angle = angleBetween(pt, ptForward);
        return kicker;
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        this.world.elements.forEach(element => {
            if (element instanceof Hero && this.contains(element)) {
                const relative = this.relativePosition(element);
                const progress = 1 - (this.radius - relative.x) / this.kickerLength;
                const kickerZ = progress * this.kickerHeight;

                if (element.z < kickerZ && element.velocityZ <= 0) {
                    element.z = kickerZ;
                    element.velocityZ = max(element.velocityZ, 0);
                    element.land();
                } else if (element.landed) {
                    element.z = kickerZ;
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
        const distance = 9999;
        const angleToPos = angleBetween(this.edgeCenter, pos);

        const angle = atan2(pos.y - this.edgeCenter().y, pos.x - this.edgeCenter().x) - this.angle;
        const distanceToEdge = cos(angle) * distance;
        return distanceToEdge;
    }

    relativePosition(pos) {
        const x = pos.x - this.x;
        const y = pos.y - this.y;
        const z = pos.z - this.z;

        return point(
            x * cos(this.angle) + y * sin(this.angle),
            -x * sin(this.angle) + y * cos(this.angle),
        );
    }

    edgeCenter() {
        return point(this.x + cos(this.angle) * 25, this.y + sin(this.angle) * 25);
    }

    updateRenderables() {
        const radius = this.kickerLength / 2;

        this.leftTop.set(-radius, -radius, 0);
        this.leftBottom.set(-radius, radius, 0);
        this.rightTop.set(radius, -radius, 0);
        this.rightBottom.set(radius, radius, 0);
        this.highTop.set(radius, -radius, this.kickerHeight);
        this.highBottom.set(radius, radius, this.kickerHeight);

        this.adjustPoints();
    }
}
