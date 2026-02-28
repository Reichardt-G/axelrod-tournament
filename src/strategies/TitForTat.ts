import { Strategy, Action } from "../core/Strategy";

export class TitForTat implements Strategy {
    name = "Tit For Tat";

    reset(): void {};

    nextMove(opponentHistory: Action[]): Action {
        if (opponentHistory.length === 0) { return 'C';}

        if (opponentHistory[opponentHistory.length - 1] === 'D') {
            return 'D';
        } else {
            return 'C';
        }
    } 
}