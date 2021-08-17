class SimulatedDraggable extends Element {

    constructor() {
        super();

        this.simulatedPoints = [];
        for (let i = 0 ; i < 10 ; i++) {
            this.simulatedPoints.push(this.newPoint());
        }

        this.simulated = new DraggedElement(new Input());

        this.renderables = [new ArrowRenderable(this.simulatedPoints)];
    }

    updateRenderables() {
        this.renderables[0].visible = this.hero && this.hero.draggable;

        if (!this.hero) return;

        this.simulated.copy(this.hero);

        this.simulatedPoints.forEach((pt, i) => {
            this.simulated.cycle(0.05);
            pt.set(this.simulated.x, this.simulated.y, this.simulated.z);
        });

        // throw new Error();
    }
}
