import { Strategy, Action } from '../core/Strategy';

export class AlwaysDefect implements Strategy {
    name = 'Always Defect';

    reset(): void {};

    nextMove(opponentHistory: Action[]): Action {
        return 'D';
    }

}