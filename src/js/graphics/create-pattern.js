createCanvasPattern = (patternWidth, patternHeight, instructions) => {
    const x = createCanvas(patternWidth, patternHeight, instructions);
    return x.getContext('2d').createPattern(x, 'repeat');
};
