class Challenge {
    constructor(label) {
        this.label = label;
    }

    check(hero, lastCombo) {

    }

    checkCompleted(hero, lastCombo) {
        if (!this.wasCompleted() && this.check(hero, lastCombo)) {
            localStorage[nomangle('ch') + this.label] = true;
            return true;
        }
    }

    wasCompleted() {
        return !!localStorage[nomangle('ch') + this.label];
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
        super(numberWithCommas(targetScore) + 'PT SCORE');
        this.targetScore = targetScore;
    }

    check(hero) {
        return hero.world.scene.score >= this.targetScore;
    }
}
class TapesChallenge extends Challenge {
    constructor() {
        super();
        this.label = nomangle('ALL TAPES');
    }

    check(hero) {
        for (const element of hero.world.elements) {
            if (element instanceof Tape) return false;
        }
        return true;
    }
}

CHALLENGES = [
    new ScoreChallenge(100000),
    new ScoreChallenge(250000),
    new ScoreChallenge(500000),

    new ComboValueChallenge(20000),
    new ComboValueChallenge(100000),
    new ComboValueChallenge(250000),

    new ComboSizeChallenge(10),
    new ComboSizeChallenge(15),
    new ComboSizeChallenge(20),

    new TrickChallenge(nomangle('RAIL TO RAIL')),
    new TrickChallenge(nomangle('540')),
    new TrickChallenge(nomangle('DOUBLE FLIPPITY')),
    new TrickChallenge(nomangle('TRIPLE FLIPPITY')),
    new TrickChallenge(nomangle('QUADRUPLE FLIPPITY')),
    new TrickChallenge(nomangle('720 DOUBLE FLIPPITY')),
    new TapesChallenge(),
];
