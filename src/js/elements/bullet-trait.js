class BulletTrait extends Trait {

    get key() {
        return 'bullet';
    }

    cycle(elapsed) {
        this.x += cos(this.angle) * elapsed * 500;
        this.y += sin(this.angle) * elapsed * 500;

        this.panel.elements.forEach(element => {
            const characterTrait = element.trait('character');
            if (characterTrait && dist(element, this) < 50) {
                this.element.remove();
                characterTrait.hurt(0.4);

                this.panel.addElement(new Element([
                    new PuffTrait('#fed', 20),
                ], initPosition(
                    this.x,
                    this.y,
                )));
            }
        });
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
