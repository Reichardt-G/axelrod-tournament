// Cooperates until opponent defects once → then defects forever
import { Strategy, Action } from '../core/Strategy';

export class GrimTrigger implements Strategy {
    name = 'Grim Trigger';

    private hasDefected = false;

    reset(): void {
        this.hasDefected = false;
    }

    nextMove(opponentHistory: Action[]): Action {
        if (this.hasDefected) {
            return 'D';
        } else if (opponentHistory[opponentHistory.length - 1] === 'D') {
            this.hasDefected = true;
            return 'D';
        } else {
            return 'C';
        }
    }
}