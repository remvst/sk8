class AutoDisappearTrait extends Trait {
    get key() {
        return 'auto-disappear'
    }

    cycle(elapsed) {
        if (!between(0, this.x, this.panel.panelWidth) || !between(0, this.y, this.panel.panelHeight)) {
            this.element.remove();
        }
    }
}
