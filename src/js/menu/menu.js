class Menu {

    constructor() {
        this.age = 0;
        this.buttons = [];
    }

    cycle(elapsed) {
        this.age += elapsed;
    }

    get animationRatio() {
        return limit(0, this.age / 0.3, 1)
    }

    render() {
        R.globalAlpha = this.animationRatio;

        R.font = nomangle('italic 72pt Impact');
        R.textAlign = nomangle('center');
        R.textBaseline = nomangle('middle');
        fs('#000');

        fatText('#fff', this.title, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4, 2);

        this.buttons.forEach(x => wrap(() => x.render()));
    }

}
