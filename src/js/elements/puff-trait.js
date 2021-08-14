class PuffTrait extends Trait {

    constructor(color, radius) {
        super();
        this.color = color;
        this.radius = radius;
    }

    get key() {
        return 'puff';
    }

    cycle(elapsed) {
        if (this.age > 0.2) {
            this.element.remove();
        }
    }

    render() {
        ss('#000');
        fs(this.color);

        const ratio = this.age / 0.2;
        R.globalAlpha = 1 - ratio;

        closedPath(() => {
            R.lineWidth = 5;
            circle(0, 0, this.radius + ratio * 20);
            fill();
        }).stroke();
    }
}
