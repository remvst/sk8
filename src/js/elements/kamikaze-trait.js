class KamikazeTrait extends Trait {
    get key() {
        return 'kamikaze'
    }

    cycle(elapsed) {
        // const dX = INPUT.right() ? 1 : (INPUT.left() ? -1 : 0);
        // const dY = INPUT.down() ? 1 : (INPUT.up() ? -1 : 0);
        //
        // if (dX || dY) {
        //     const angle = atan2(dY, dX);
        //     this.x += cos(angle) * elapsed * 300;
        //     this.y += sin(angle) * elapsed * 300;
        // }
        //
        // const weaponHolderTrait = this.trait('weapon-holder');
        // if (weaponHolderTrait) {
        //     weaponHolderTrait.triggerDown = INPUT.shoot();
        // }
        // this.angle = angleBetween(this, this.panel.mousePosition);

        const hero = this.panel.hero;
        if (!hero) return;

        const angle = angleBetween(this, hero);
        this.x += cos(angle) * elapsed * 200;
        this.y += sin(angle) * elapsed * 200;

        if (dist(this, hero) < 100) {
            die();
        }
    }

    die() {
        super.die();

        this.panel.addElement(new Element([
            new PuffTrait('#ff0', 70),
        ], initPosition(this.x, this.y)));
    }
}
