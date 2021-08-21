class WelcomeScene extends Scene {

    constructor() {
        super();

        this.hud.setPermanentMessage([
            nomangle('Welcome to my space-themed skatepark!'),
        ]);
    }

    setupActualWorld() {
        super.setupActualWorld();

        this.world.hero.input = new EmptyInput();
        this.nextScene = new PushScene();
    }

    completionMessage() {
        return nomangle('Let\'s go through the basics');
    }

    completionDelay() {
        return 3;
    }

    setupDemoWorld() {
        this.demoWorld = null;
    }

    isPerformingCompletingAction(hero) {
        return hero.age > 3;
    }
}
