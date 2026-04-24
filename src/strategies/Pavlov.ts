// Win-Stay, Lose-Shift
// Behavior is reinforced by outcome.
import { Strategy, Action } from '../core/Strategy';

export class Pavlov implements Strategy{
    name = 'Pavlov';

    private lastMove: Action = 'C';

    reset(): void{
        this.lastMove = 'C';
    }

    nextMove(opponentHistory: Action[]): Action { 
        //1st round
        if (opponentHistory.length === 0) { 
            this.lastMove = 'C';
            return 'C';
        }

        const lastOpponentMove = opponentHistory[opponentHistory.length - 1];

        // if lastRound C - C: stay
        if (this.lastMove === 'C' && lastOpponentMove === 'C') {
            this.lastMove = 'C';
            return 'C';
        }

        // if lastRound D - C: stay
        if (this.lastMove === 'D' && lastOpponentMove === 'C') {
            this.lastMove = 'D';
            return 'D';
        }

        // if lastRound C - D: shift
        if (this.lastMove === 'C' && lastOpponentMove === 'D') {
            this.lastMove = 'D';
            return 'D';
        }

        // if lastRound D - D: shift
        if (this.lastMove === 'D' && lastOpponentMove === 'D') {
            this.lastMove = 'C';
            return 'C';
        }
        
        // default to cooperate
        return 'C';
    }
}