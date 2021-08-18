class PushScene extends Scene {

    setupDemoWorld() {
        super.setupDemoWorld();

        this.demoWorld.hero.input.pushing = () => this.demoWorld.age > 1 && this.demoWorld.age < 3;
        this.demoDuration = 4;
    }
}
