class PushScene extends Scene {

    constructor() {
        super();

        this.hud.setPermanentMessage([
            nomangle('Let\'s start by gaining some speed.'),
            nomangle('Hold SPACE to push.'),
        ]);
        this.demoDuration = 4;

        this.nextScene = new DirectionScene();
    }

    setupDemoWorld() {
        super.setupDemoWorld();
        this.demoWorld.hero.input.pushing = () => this.demoWorld.age > 1 && this.demoWorld.age < 3;
    }

    isPerformingCompletingAction(hero) {
        return hero.speed > 300;
    }
}
