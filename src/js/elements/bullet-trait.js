class BulletTrait extends Trait {

    get key() {
        return 'bullet';
    }

    cycle(elapsed) {
        this.x += cos(this.angle) * elapsed * 500;
        this.y += sin(this.angle) * elapsed * 500;
    }

    render() {
        ss('#000');
        fs('#fff');

        closedPath(() => {
            R.lineWidth = 5;
            circle(0, 0, 20);
            fill();
        }).stroke();
    }
}
