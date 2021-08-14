class CharacterTrait extends Trait {
    constructor(characterType) {
        super();
        this.characterType = characterType;
    }

    get key() {
        return 'character'
    }

    get walking() {
        return this.x != this.prevX || this.y != this.prevY;
    }

    cycle(elapsed) {
        this.prevX = this.x;
        this.prevY = this.y;
    }

    render() {
        const targetPosition = {
            'x': this.panel.mousePosition.x - this.x,
            'y': this.panel.mousePosition.y - this.y,
        };
        mainCharacter(0, 0, targetPosition, this.walking);
    }
}
