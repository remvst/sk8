class RotationScene extends Scene {

    constructor() {
        super();

        this.hud.setPermanentMessage( [
            nomangle('Once in the air, move the mouse'),
            nomangle('left and right for rotation.'),
        ]);
        this.nextScene = new GrindScene();

        this.demoDuration = 6;

        this.requiredCompletionActionCount = 3;
    }

    setupDemoWorld() {
        super.setupDemoWorld();

        const { hero } = this.demoWorld;
        hero.input.pushing = () => between(0.5, this.demoWorld.age, 2);
        hero.input.squat = () => between(3, this.demoWorld.age, 4);
    }

    isPerformingCompletingAction(hero) {
        const momentumAngle = atan2(hero.momentum.y, hero.momentum.x);
        return abs(normalize(momentumAngle - hero.angle)) > PI / 2;
    }
}
