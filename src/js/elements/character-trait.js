class CharacterTrait extends Trait {
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
}
