class Kicker extends Element {

    constructor() {
        super();

        this.length = 50;
        this.height = 100;
        this.radius = this.length / 2;

        this.leftTop = this.newPoint();
        this.leftBottom = this.newPoint();
        this.rightTop = this.newPoint();
        this.rightBottom = this.newPoint();
        this.highTop = this.newPoint();
        this.highBottom = this.newPoint();


        this.renderables = [
            new Segment(this.leftTop, this.leftBottom),
            new Segment(this.rightTop, this.rightBottom),
            // new Segment(this.leftTop, this.rightTop),
            // new Segment(this.leftBottom, this.rightBottom),
            new Segment(this.highTop, this.highBottom),
            new Segment(this.leftTop, this.highTop),
            new Segment(this.leftBottom, this.highBottom),
            new Segment(this.highTop, this.rightTop),
            new Segment(this.highBottom, this.rightBottom),

            new Plane([this.leftTop, this.highTop, this.highBottom, this.leftBottom]),

            // new Disk(this.edgeCenter(), 10),
        ];
    }

    cycle(elapsed) {
        this.world.elements.forEach(element => {
            if (element instanceof Hero && this.contains(element)) {
                const relative = this.relativePosition(element);
                const progress = 1 - (this.radius - relative.x) / this.length;
                element.z = progress * this.height;
                element.velocityZ = 0;
            }
        });
    }

    contains(pos) {
        const relative = this.relativePosition(pos);
        return between(-this.radius, relative.x, this.radius) &&
            between(-this.radius, relative.y, this.radius);
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

        // const r = dist(pos, pt);

        const rotated = new Point();
        rotated.x = pt.x * Math.cos(this.angle) + pt.y * Math.sin(this.angle);
        rotated.y = -pt.x * Math.sin(this.angle) + pt.y * Math.cos(this.angle);

        // pt.x += r * Math.cos()

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

    renderElement() {
        super.renderElement();

        return;

        const distanceToEdge = this.distanceToEdge(hero);
        ctx.beginPath();
        ctx.moveTo(this.edgeCenter().x, this.edgeCenter().y);
        ctx.lineTo(
            this.edgeCenter().x + Math.cos(this.angle) * distanceToEdge,
            this.edgeCenter().y + Math.sin(this.angle) * distanceToEdge,
        );
        ctx.stroke();

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const relativePosition = this.relativePosition(hero);
        ctx.fillStyle = 'purple';
        ctx.fillRect(relativePosition.x - 5, relativePosition.y - 5, 10, 10);
        ctx.restore();

        ctx.restore();
    }
}
