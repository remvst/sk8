class TrickScene extends Scene {

    constructor() {
        super();

        this.demoDuration = 6;

        this.hud.setPermanentMessage([
            nomangle('While jumping, press SPACE to perform a trick'),
        ]);

        this.nextScene = new RotationScene();

        this.requiredCompletionActionCount = 3;
    }

    setupDemoWorld() {
        super.setupDemoWorld();

        const { hero } = this.demoWorld;
        hero.input.pushing = () => between(0.5, this.demoWorld.age, 2);
        hero.input.squat = () => between(3, this.demoWorld.age, 4);
        hero.input.trick = () => !hero.trickProgress;
    }

    isPerformingCompletingAction(hero) {
        return hero.performingTrick;
    }
}
