railStartX = 1500;
railFinalX = 2500;

class GrindScene extends Scene {

    constructor() {
        super();

        this.hud.setPermanentMessage([
            nomangle('While jumping, HOLD CLICK to grind,'),
            nomangle('then move your mouse for balance.'),
        ]);

        this.requiredCompletionActionCount = 3;
    }

    completionMessage() {
        return nomangle('Nice! You are ready to use the skatepark!');
    }

    setupWorld(world) {
        super.setupWorld(world);

        for (let x = 0 ; x <= 6000 ; x += 2000) {
            world.addElement(new Rail([
                point(railStartX + x, 0, 100),
                point(railFinalX + x, 0, 100),
            ]));
        }
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
        const rail = this.world.elements.find(x => x instanceof Rail);
        if (!this.didTryCompletingAction && this.completionActionCount < this.requiredCompletionActionCount && rail.renderables[0].color != COLOR_WHITE && !this.world.hero.input.grind()) {
            this.hud.showWorldMessage(nomangle('HOLD CLICK TO GRIND'));
            return;
        }

        super.cycle(elapsed);

        this.demoWorld.hero.balance = sin(this.age * PI) * 0.5;
    }

    isPerformingCompletingAction(hero) {
        return hero.grinding;
    }
}
