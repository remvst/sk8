class SessionScene extends ParkScene {

    setupWorld(world) {
        super.setupWorld(world);

        this.timeLeft = 120;
        this.ended = false;
    }

    cycle(elapsed) {
        super.cycle(elapsed);

        if (this.timeLeft > 0) {
            this.timeLeft = max(0, this.timeLeft - elapsed);

            if (this.timeLeft <= 0 && this.world.hero.landed && !this.ended) {
                this.ended = true;
                this.world.hero.speed = 0;
                this.world.hero.comboTracker.locked = true;
                this.world.hero.input = new EmptyInput();

                G.transition('#fff', 1);

                setTimeout(() => G.setMenu(new EndMenu(this.score)), 2000);
            }
        }
    }
}
