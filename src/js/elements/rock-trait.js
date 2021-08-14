class RockTrait extends Trait {

    get key() {
        return 'rock';
    }

    render() {
        ss('#000');

        closedPath(() => {
            circle(0, 0, this.trait('collidable').collisionRadius);

            fs('#888');
            fill();
        }).stroke();
    }
}
