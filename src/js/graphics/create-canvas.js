const createCanvas = (w, h, instructions) => {
    const can = DOCUMENT.createElement('canvas');
    can.width = w;
    can.height = h;
    return instructions(can.getContext('2d'), can) || can;
};
