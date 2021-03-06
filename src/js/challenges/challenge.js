class Challenge {
    constructor(label) {
        this.label = label;
    }

    checkCompleted(hero, lastCombo) {
        if (!this.wasCompleted() && this.check(hero, lastCombo)) {
            localStorage[this.label] = true;
            return true;
        }
    }

    wasCompleted() {
        return !!localStorage[this.label];
    }
}

class TrickChallenge extends Challenge {
    check(hero, lastCombo) {
        return lastCombo.asString.indexOf(this.label) >= 0;
    }
}

class ComboValueChallenge extends Challenge {
    constructor(targetValue) {
        super(numberWithCommas(targetValue) + nomangle('PT COMBO'));
        this.targetValue = targetValue;
    }

    check(hero, lastCombo) {
        return lastCombo.total >= this.targetValue;
    }
}

class ComboSizeChallenge extends Challenge {
    constructor(targetCount) {
        super(targetCount + nomangle('X COMBO'));
        this.targetCount = targetCount;
    }

    check(hero, lastCombo) {
        return lastCombo.tricks.length >= this.targetCount;
    }
}

class ScoreChallenge extends Challenge {
    constructor(targetScore) {
        super(numberWithCommas(targetScore) + nomangle('PT SCORE'));
        this.targetScore = targetScore;
    }

    check(hero) {
        return hero.world.scene.score >= this.targetScore;
    }
}

class TapesChallenge extends Challenge {
    constructor() {
        super();
        this.label = nomangle('ALL 5 TAPES');
    }

    check(hero) {
        for (const element of hero.world.elements) {
            if (element instanceof Tape) return;
        }
        return true;
    }
}

CHALLENGES = [
    new ScoreChallenge(1e5),
    new ScoreChallenge(5e5),
    new ScoreChallenge(1e6),

    new ComboValueChallenge(5e4),
    new ComboValueChallenge(25e4),
    new ComboValueChallenge(5e4),

    new ComboSizeChallenge(10),
    new ComboSizeChallenge(20),
    new ComboSizeChallenge(30),

    new TrickChallenge(nomangle('RAIL TO RAIL')),
    new TrickChallenge(nomangle('540')),
    new TrickChallenge(nomangle('DOUBLE FLIPPITY')),
    new TrickChallenge(nomangle('360 TRIPLE FLIPPITY')),
    new TrickChallenge(nomangle('QUADRUPLE FLIPPITY')),
    new TrickChallenge(nomangle('720 DOUBLE FLIPPITY')),
    new TapesChallenge(),
];
