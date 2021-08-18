class RotationScene extends Scene {

    setupDemoWorld() {
        super.setupDemoWorld();

        const { hero } = this.demoWorld;
        hero.input.pushing = () => between(0.5, this.demoWorld.age, 2);
        hero.input.squat = () => between(3, this.demoWorld.age, 4);
    }

    cycle(elapsed) {
        super.cycle(elapsed);
        if (this.demoWorld.age > 6) this.setupDemoWorld();
    }
}
