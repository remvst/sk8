class Sound {
    constructor(definition, shouldLoop) {
        this.source = zzfx(...definition);
        this.source.loop = shouldLoop;
        this.source.start();
    }

    stop() {
        this.source.stop();
    }
}

jumpSound = () => new Sound([rawFile('config/sounds/jump')]);
bailSound = () => new Sound([rawFile('config/sounds/bail')]);
tickSound = () => new Sound([rawFile('config/sounds/tick')]);
landSound = () => new Sound([rawFile('config/sounds/land')]);
clickSound = () => new Sound([rawFile('config/sounds/click')]);
trickSound = () => new Sound([rawFile('config/sounds/trick')]);
pickupSound = () => new Sound([rawFile('config/sounds/pickup')]);

grindSound = null;

setGrinding = (grinding) => {
    if (grinding) {
        if (!grindSound) {
            grindSound = new Sound([rawFile('config/sounds/grind')], true);
        }
    } else {
        if (grindSound) {
            grindSound.stop();
            grindSound = null;
        }
    }
}
