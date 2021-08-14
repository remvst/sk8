const initPosition = (x, y, angle = 0) => (element) => {
    element.x = x;
    element.y = y;
    element.angle = angle;
};

class Element {
    constructor(traits, init) {
        this.x = this.y = this.age = this.angle = 0;

        this.traits = traits;
        this.traitMap = {};
        this.init = init || (() => 0);
    }

    bind(panel) {
        this.traits.forEach(trait => {
            this.traitMap[trait.key] = trait;
            trait.element = this;
            trait.panel = this.panel = panel;
        });

        this.init(this);
    }

    trait(key) {
        return this.traitMap[key];
    }

    cycle(elapsed) {
        this.age += elapsed;
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
        // fs('#f00');
        // fr(-10, -10, 20, 20);

        this.traits.forEach(trait => trait.render());
    }

    remove() {
        this.panel.removeElement(this);
    }
}
