class DirectionScene extends Scene {

    setupDemoWorld() {
        super.setupDemoWorld();

        this.demoWorld.hero.input.pushing = () => this.demoWorld.age > 1 && this.demoWorld.age < 2;
        this.demoWorld.hero.input.direction = () => {
            if (between(3, this.demoWorld.age, 4)) return PI / 4;
            if (between(5, this.demoWorld.age, 6)) return -PI / 4;
            return 0;
        };
        this.demoDuration = 8;

        this.hud.setPermanentMessage( [
            nomangle('Once you\'ve gained some speed,'),
            nomangle('move around using your mouse.'),
        ]);

        this.nextScene = new JumpScene();
    }

    isPerformingCompletingAction(hero) {
        return hero.speed > 200 && abs(hero.angle) > PI / 2;
    }
}
