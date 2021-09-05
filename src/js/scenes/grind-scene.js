railStartX = 1500;
railFinalX = 2500;

class GrindScene extends Scene {

    constructor() {
        super();

        this.hud.setPermanentMessage([
            nomangle('While jumping, CLICK AND HOLD to grind,'),
            nomangle('then move your mouse for balance.'),
        ]);
    }

    completionMessage() {
        return nomangle('Nice! You are now ready to use the skatepark!');
    }

    setupWorld(world) {
        super.setupWorld(world);

        world.addElement(new Rail([
            point(railStartX, 0, 100),
            point(railFinalX, 0, 100),
        ]));
    }

    proceed() {
        localStorage[nomangle('tut')] = 1;
        G.mainMenu();
    }

    setupDemoWorld() {
        super.setupDemoWorld();

        const { hero } = this.demoWorld;
        hero.input.pushing = () => hero.x < railStartX - 600;
        hero.input.squat = () => between(railStartX - 500, hero.x, railStartX - 300);
        hero.input.grind = () => between(railStartX, hero.x, railFinalX);

        this.demoDuration = 6;
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        this.demoWorld.hero.balance = sin(this.age * PI) * 0.5;
    }

    isPerformingCompletingAction(hero) {
        return hero.grinding;
    }
}
