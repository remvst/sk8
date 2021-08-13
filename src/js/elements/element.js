const initPosition = (x, y) => (element) => {
    element.x = x;
    element.y = y;
};

class Element {
    constructor(traits, init) {
        this.x = this.y = 0;

        this.traits = traits;
        this.traitMap = {};
        if (init) init(this);
    }

    bind(panel) {
        this.traits.forEach(trait => {
            this.traitMap[trait.key] = trait;
            trait.element = this;
            trait.panel = this.panel = panel;
        });
    }

    cycle(elapsed) {
        this.traits.forEach(trait => trait.cycle(elapsed));
    }

    render() {
        // console.log('render element');
        wrap(() => {
            translate(this.x, this.y);
            this.renderElement();
        });
    }

    renderElement() {
        fs('#f00');
        fr(-10, -10, 20, 20);

        this.traits.forEach(trait => trait.render());
    }
}
