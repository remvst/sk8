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

        const weaponHolderTrait = this.trait('weapon-holder');
        if (weaponHolderTrait) {
            weaponHolderTrait.triggerDown = INPUT.shoot();
        }
        this.angle = angleBetween(this, this.panel.mousePosition);
    }
}
