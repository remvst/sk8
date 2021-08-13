class BoundTrait extends Trait {
    constructor(boundRadius) {
        super();
        this.boundRadius = boundRadius;
    }

    get key() {
        return 'bound'
    }

    cycle(elapsed) {
        this.x = limit(this.boundRadius, this.x, this.panel.panelWidth - this.boundRadius);
        this.y = limit(this.boundRadius, this.y, this.panel.panelHeight - this.boundRadius);
    }
}
