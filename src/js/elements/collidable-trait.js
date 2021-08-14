class CollidableTrait extends Trait {

    constructor(collisionRadius, weight = 1) {
        super();
        this.collisionRadius = collisionRadius;
        this.weight = weight;
    }

    get key() {
        return 'collidable'
    }

    cycle(elapsed) {
        this.panel.elements.forEach(element => {
            const collidableTrait = element.trait('collidable');
            if (element == this.element || !collidableTrait) return;

            const distance = dist(element, this);
            const minDistance = this.collisionRadius + collidableTrait.collisionRadius;
            if (distance < minDistance) {
                const moveSelfFactor = 1 - this.weight / (this.weight + collidableTrait.weight);

                const angle = angleBetween(this, element);
                this.x -= cos(angle) * (minDistance - distance) * moveSelfFactor;
                this.y -= sin(angle) * (minDistance - distance) * moveSelfFactor;

                element.x += cos(angle) * (minDistance - distance) * (1 - moveSelfFactor);
                element.y += sin(angle) * (minDistance - distance) * (1 - moveSelfFactor);
            }
        });
    }
}
