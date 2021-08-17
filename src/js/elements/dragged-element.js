class DraggedElement extends Element {

    constructor() {
        super();
        this.velocityZ = 0;
        this.speed = 400;
        this.momentum = new Point();
    }

    copy(otherHero) {
        this.x = otherHero.x;
        this.y = otherHero.y;
        this.z = otherHero.z;
        this.angle = otherHero.angle;
        this.speed = otherHero.speed;
    }

    get draggable() {
        return true;
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (this.draggable) {
            const angleDirection = INPUT.direction();
            const diff = limit(-elapsed * PI * 1.5, normalize(angleDirection - this.angle), elapsed * PI * 1.5);
            this.angle += diff;

            this.momentum.set(cos(this.angle), sin(this.angle));
        }

        this.x += elapsed * this.momentum.x * this.speed;
        this.y += elapsed * this.momentum.y * this.speed;
    }
}