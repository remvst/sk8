class TrickScene extends Scene {

    setupDemoWorld() {
        super.setupDemoWorld();

        const { hero } = this.demoWorld;

        hero.input.pushing = () => between(0.5, this.demoWorld.age, 2);
        hero.input.squat = () => between(3, this.demoWorld.age, 4);
        hero.input.trick = () => !hero.trickProgress;

        this.demoDuration = 6;

        this.hud.setPermanentMessage( [
            nomangle('While jumping, hold SPACE to perform a trick'),
        ]);
    }

    isPerformingCompletingAction(hero) {
        return hero.performingTrick;
    }
}
