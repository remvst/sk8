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

/*
// beepSound = sound([rawFile('config/sounds/beep')]);
// exitSound = sound([rawFile('config/sounds/exit')]);
// failSound = sound([rawFile('config/sounds/fail')]);
// finishSound = sound([rawFile('config/sounds/finish')]);
// jumpSound = sound([rawFile('config/sounds/jump')]);
// landSound = sound([rawFile('config/sounds/land')]);
// nextLevelSound = sound([rawFile('config/sounds/next-level')]);
// notFoundSound = sound([rawFile('config/sounds/not-found')]);*/

jumpSound = () => new Sound([rawFile('config/sounds/jump')]);
bailSound = () => new Sound([rawFile('config/sounds/bail')]);
tickSound = () => new Sound([rawFile('config/sounds/tick')]);

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
