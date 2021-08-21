class JumpScene extends Scene {

    constructor() {
        super();

        this.hud.setPermanentMessage([
            nomangle('Click and release to jump'),
        ]);
    }

    completionMessage() {
        return nomangle('Nice! Hold your click to jump higher.');
    }

    completionDelay() {
        return 6;
    }

    setupDemoWorld() {
        super.setupDemoWorld();

        const { hero } = this.demoWorld;
        hero.input.pushing = () => between(0.5, this.demoWorld.age, 2);
        hero.input.squat = () => between(3, this.demoWorld.age, 4);

        this.demoDuration = 6;

        this.nextScene = new TrickScene();
    }

    isPerformingCompletingAction(hero) {
        return hero.z > 0;
    }
}
