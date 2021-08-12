FONT_DEFINITIONS = {
    'a': [
        [0, 1, 0.5, 0, 1, 1,],
        [0.25, 0.5, 0.75, 0.5,],
    ],
    'b': [
        [0, 0, 0, 1, 1, 0.75, 0, 0.5, 1, 0.25, 0, 0,],
    ],
    'c': [
        [1, 0, 0, 0, 0, 1, 1, 1, ],
    ],
    'd': [
        [0, 0, 0, 1, 1, 0.5, 0, 0, ],
    ],
    'e': [
        [1, 0, 0, 0, 0, 1, 1, 1, ],
        [0, 0.5, 0.5, 0.5, ],
    ],
    'f': [
        [1, 0, 0, 0, 0, 1, ],
        [0, 0.5, 0.5, 0.5, ],
    ],
    'g': [
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 0.5, 0.5, 0.5, ],
    ],
    'h': [
        [0, 0, 0, 1],
        [1, 0, 1, 1],
        [0, 0.5, 1, 0.5],
    ],
    'i': [
        [0.5, 0, 0.5, 1],
        [0.25, 0, 0.75, 0],
        [0.25, 1, 0.75, 1],
    ],
    'j': [
        [0.25, 0, 0.75, 0],
        [0.5, 0, 0.5, 1, 0, 1, 0, 0.75],
    ],
    'k': [
        [0, 0, 0, 1],
        [1, 0, 0, 0.5, 1, 1]
    ],
    'l': [
        [0, 0, 0, 1, 1, 1],
    ],
    'm': [
        [0, 1, 0, 0, 0.5, 0.5, 1, 0, 1, 1]
    ],
    'n': [
        [0, 1, 0, 0, 1, 1, 1, 0],
    ],
    'o': [
        [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    ],
    'p': [
        [0, 1, 0, 0, 1, 0, 1, 0.5, 0, 0.5],
    ],
    'q': [
        [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
        [0.7, 0.8, 1.2, 1.2],
    ],
    'r': [
        [0, 1, 0, 0, 1, 0, 1, 0.5, 0, 0.5, 1, 1],
    ],
    's': [
        [1, 0, 0, 0, 0, 0.5, 1, 0.5, 1, 1, 0, 1]
    ],
    't': [
        [0, 0, 1, 0],
        [0.5, 0, 0.5, 1],
    ],
    'u': [
        [0, 0, 0, 1, 1, 1, 1, 0],
    ],
    'v': [
        [0, 0, 0.5, 1, 1, 0],
    ],
    'w': [
        [0, 0, 0.25, 1, 0.5, 0.5, 0.75, 1, 1, 0],
    ],
    'x': [
        [0, 0, 1, 1],
        [1, 0, 0, 1],
    ],
    'y': [
        [0, 0, 0.5, 0.5, 1, 0],
        [0.5, 0.5, 0.5, 1],
    ],
    'z': [
        [0, 0, 1, 0, 0, 1, 1, 1],
    ],
    "'": [
        [0.25, 0.25, 0.5, 0],
    ]
};

Object.values(FONT_DEFINITIONS).forEach(definition => {
    definition.w = 0;
    definition.forEach(polygon => {
        for (let i = 0 ; i < polygon.length ; i += 2) {
            definition.w = max(definition.w, min(1, polygon[i]));
        }
    });
});

canvasProto.renderCharacter = function(character, w, h) {
    const definition = FONT_DEFINITIONS[character];
    if (!definition) return 1;

    this.path(() => {
        definition.forEach(polygon => {
            const mappedPolygon = polygon.map((x, i) => {
                return x * (i % 2 ? h : w);
            });

            this.polygon(...mappedPolygon);
        });
    }).stroke();

    return definition.w;
};

canvasProto.renderString = function(s, w, h, spacing = 0) {
    this.wrap(() => {
        for (const character of s) {
            const characterWidth = this.renderCharacter(character, w, h);
            translate(characterWidth * w + spacing, 0);
        }
    });
};

canvasProto.renderCenteredString = function(s, w, h, spacing = 0) {
    const totalWidth = this.stringWidth(s, w, spacing);
    this.wrap(() => {
        this.translate(-totalWidth / 2, 0);
        this.renderString(s, w, h, spacing);
    });
}

canvasProto.stringWidth = function(s, w, spacing = 0) {
    let acc = -spacing;
    for (const character of s) {
        const definition = FONT_DEFINITIONS[character];
        acc += (definition ? definition.w : 1) * w + spacing;
    }
    return acc;
}
