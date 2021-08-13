class HeroTrait extends Trait {
    get key() {
        return 'hero'
    }

    cycle(elapsed) {
        const dX = INPUT.right() ? 1 : (INPUT.left() ? -1 : 0);
        const dY = INPUT.down() ? 1 : (INPUT.up() ? -1 : 0);

        if (dX || dY) {
            const angle = atan2(dY, dX);
            this.x += cos(angle) * elapsed * 100;
            this.y += sin(angle) * elapsed * 100;
        }
    }

    render() {
        const targetPosition = {
            'x': this.panel.mousePosition.x - this.x,
            'y': this.panel.mousePosition.y - this.y,
        };
        mainCharacter(0, 0, targetPosition);
    }
}
