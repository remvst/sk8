class HeroTrait extends Trait {
    get key() {
        return 'hero'
    }

    cycle(elapsed) {
        const dX = INPUT.right() ? 1 : (INPUT.left() ? -1 : 0);
        const dY = INPUT.down() ? 1 : (INPUT.up() ? -1 : 0);

        if (dX || dY) {
            const angle = atan2(dY, dX);
            this.x += cos(angle) * elapsed * 300;
            this.y += sin(angle) * elapsed * 300;
        }
    }

    render() {
        ss('#000');

        const targetPosition = {
            'x': this.panel.mousePosition.x - this.x,
            'y': this.panel.mousePosition.y - this.y,
        };
        mainCharacter(0, 0, targetPosition, this.trait('character').walking);

        fs('#000');

        path(() => {
            doodleFactor(2);

            // translate(gunPosition.x, gunPosition.y);

            const angle = angleBetween(this, this.panel.mousePosition);
            rotate(angle);

            if (cos(angle) < 0) {
                scale(1, -1);
            }

            rectangle(60, -15, 50, 10);
            rectangle(60, -5, 10, 10);
            fill();
        }).stroke();
    }
}
