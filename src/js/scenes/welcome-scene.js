class WelcomeScene extends Scene {

    setupActualWorld() {
        super.setupActualWorld();

        this.world.hero.input = new EmptyInput();
    }

    setupDemoWorld() {
        this.demoWorld = null;
        this.hud.setPermanentMessage( [
            nomangle('Welcome to SPACE SK8R.'),
            nomangle('Let\'s go through the basics.'),
        ]);
    }
}
