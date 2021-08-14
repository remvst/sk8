class KamikazeTrait extends Trait {
    get key() {
        return 'kamikaze'
    }

    cycle(elapsed) {
        const hero = this.panel.hero;
        if (!hero) return;

        const angle = angleBetween(this, hero);
        this.x += cos(angle) * elapsed * 200;
        this.y += sin(angle) * elapsed * 200;

        if (dist(this, hero) < 100) {
            this.explode();
        }
    }

    explode() {
        this.trait('character').die();

        this.panel.addElement(new Element([
            new PuffTrait('#ff0', 100),
        ], initPosition(this.x + rnd(-50, 50), this.y + rnd(-50, 50))));

        for (const element of this.panel.elements) {
            const characterTrait = element.trait('character');
            if (characterTrait && dist(element, this) < 150) {
                characterTrait.hurt(1);
            }
        }
    }
}
