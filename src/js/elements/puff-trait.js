class PuffTrait extends Trait {

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
        fs('#fed');

        const ratio = this.age / 0.2;
        R.globalAlpha = 1 - ratio;

        closedPath(() => {
            R.lineWidth = 5;
            circle(0, 0, 20 + ratio * 20);
            fill();
        }).stroke();
    }
}
