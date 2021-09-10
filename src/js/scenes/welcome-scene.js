class WelcomeScene extends Scene {

    constructor() {
        super();

        this.hud.setPermanentMessage([
            nomangle('Welcome to STICK SKATER!'),
        ]);

        this.nextScene = new PushScene();
    }

    setupActualWorld() {
        super.setupActualWorld();

        this.world.hero.input = new EmptyInput();
    }

    completionMessage() {
        return nomangle('Let\'s go through the basics');
    }

    completionDelay() {
        return 4;
    }

    setupDemoWorld() {
        this.demoWorld = null;
    }

    isPerformingCompletingAction(hero) {
        return hero.age > 3;
    }
}
