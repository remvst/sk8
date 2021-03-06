gamepads = () => (navigator.getGamepads ? Array.from(navigator.getGamepads()) : []).filter(x => !!x);

isGamepadButtonPressed = x => {
    const pads = gamepads();
    for (let i = 0; i < pads.length; i++) {
        try {
            if (pads[i].buttons[x].pressed) {
                return true;
            }
        } catch (e) {}
    }
};

gamepadAxisValue = (axisIndex) => {
    const pads = gamepads();
    for (let i = 0; i < pads.length; i++) {
        try {
            const value = pads[i].axes[axisIndex];
            if (abs(value) < 0.1) return 0;
            return pads[i].axes[axisIndex];
        } catch (e) {}
    }
    return 0;
};
