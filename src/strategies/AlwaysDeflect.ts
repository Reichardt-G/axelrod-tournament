import { Strategy, Action } from '../core/Strategy';

export class AlwaysDeflect implements Strategy {
    name = 'Always Deflect';

    reset(): void {};

    nextMove(opponentHistory: Action[]): Action {
        return 'D';
    }

}