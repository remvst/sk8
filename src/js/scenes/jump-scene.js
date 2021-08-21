class JumpScene extends Scene {

    setupDemoWorld() {
        super.setupDemoWorld();

        const { hero } = this.demoWorld;
        hero.input.pushing = () => between(0.5, this.demoWorld.age, 2);
        hero.input.squat = () => between(3, this.demoWorld.age, 4);

        this.demoDuration = 6;

        this.hud.setPermanentMessage([
            nomangle('Click and release to jump'),
        ]);

        this.nextScene = new TrickScene();
    }

    isPerformingCompletingAction(hero) {
        return hero.z > 0;
    }
}
