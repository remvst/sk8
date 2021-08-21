class WelcomeScene extends Scene {

    setupActualWorld() {
        super.setupActualWorld();

        this.world.hero.input = new EmptyInput();
    }

    completionMessage() {
        return nomangle('Let\'s go through the basics');
    }

    completionDelay() {
        return 3;
    }

    setupDemoWorld() {
        this.demoWorld = null;
        this.hud.setPermanentMessage( [
            nomangle('Welcome to my space-themed skatepark!'),
        ]);
    }

    isPerformingCompletingAction(hero) {
        return hero.age > 3;
    }
}
