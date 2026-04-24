// Like TFT, but sometimes forgives defection
import { Strategy, Action } from '../core/Strategy';

export class GenerousTitForTat implements Strategy {
    name = 'Generous Tit For Tat';

    // forgiveness Rate must obey: 0 <= forgivenessRate <= 100.
    constructor(private forgivenessRate: number = 40) {}

    reset(): void {};

    nextMove(opponentHistory: Action[]): Action {
        if (opponentHistory.length === 0) { return 'C';}

        if (opponentHistory[opponentHistory.length - 1] === 'D') {
            if (Math.random()*100 <= this.forgivenessRate) {
                return 'C';
            } 
            return 'D';
        } else {
            return 'C';
        }
    } 
}