class CharacterTrait extends Trait {
    constructor(characterType) {
        super();
        this.characterType = characterType;
        this.health = 1;
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

    hurt(x) {
        if (this.health) {
            this.health -= x;
            if (this.health <= 0) {
                this.die();
            }
        }
    }

    die() {
        for (let i = 0 ; i < 5 ; i++) {
            this.panel.addElement(new Element([
                new PuffTrait(i % 2 ? '#ff0' : '#f00', 25),
            ], initPosition(this.x + rnd(-50, 50), this.y + rnd(-50, 50))));
        }

        this.element.remove();
    }
}
