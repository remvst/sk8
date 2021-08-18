class PushScene extends Scene {

    constructor() {
        super();
        this.hud.setPermanentMessage( [
            nomangle('Let\'s start by gaining some speed.'),
            nomangle('Hold [SPACE] to push.'),
        ]);
    }

    setupDemoWorld() {
        super.setupDemoWorld();

        this.demoWorld.hero.input.pushing = () => this.demoWorld.age > 1 && this.demoWorld.age < 3;
        this.demoDuration = 4;
    }
}
