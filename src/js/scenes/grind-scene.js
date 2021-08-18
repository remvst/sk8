railStartX = 1500;
railFinalX = 2500;

class GrindScene extends Scene {

    setupWorld(world) {
        super.setupWorld(world);

        world.addElement(new Rail([
            new Point(railStartX, 0, 100),
            new Point(railFinalX, 0, 100),
        ]));
    }

    setupDemoWorld() {
        super.setupDemoWorld();

        const { hero } = this.demoWorld;
        hero.input.pushing = () => hero.x < railStartX - 600;
        hero.input.squat = () => between(railStartX - 400, hero.x, railStartX - 300);
        hero.input.grind = () => between(railStartX, hero.x, railFinalX);

        this.demoDuration = 6;

        this.hud.setPermanentMessage( [
            nomangle('While jumping, CLICK AND HOLD to grind,'),
            nomangle('then move your mouse for balance.'),
        ]);
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        const { hero } = this.demoWorld;
        hero.balance = sin(this.age * PI) * 0.5;
    }
}
