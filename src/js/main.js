onload = () => {
    CANVAS.width = CANVAS_WIDTH;
    CANVAS.height = CANVAS_HEIGHT;

    MOBILE = !!navigator.userAgent.match(nomangle(/andro|ipho|ipa|ipo/i));
    if (MOBILE) {
        CANVAS.height += MOBILE_CONTROLS_HEIGHT;
    }

    onresize(); // trigger initial sizing pass

    R = CANVAS.getContext('2d');
    R.lineCap = R.lineJoin = nomangle('round');

    // Shortcut for all canvas methods to the main canvas
    Object.getOwnPropertyNames(canvasProto).forEach(n => {
        if (R[n].call) {
            WINDOW[n] = canvasProto[n].bind(R);
        }
    });

    // Create the game
    new Game();

    // Run the game at 200 FPS
    let didCycle = false;
    loop(
        (e, fps) => {
            G.cycle(e);
            didCycle = true;

            if (DEBUG) {
                G.cycleFps = fps;
            }
        },
        func => setTimeout(func, 1000 / 200)
    );

    // Render at 60 FPS
    loop(
        (e, fps) => {
            // Don't render if nothing was updated
            if (didCycle) {
                wrap(() => G.render());

                if (DEBUG) {
                    G.renderFps = fps;
                }
            }
        },
        func => requestAnimationFrame(func)
    );

};
