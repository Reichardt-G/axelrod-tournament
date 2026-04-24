// Starts with defect instead of cooperate
import { Strategy, Action } from "../core/Strategy";

export class SuspiciousTitForTat implements Strategy {
    name = "Suspicious Tit For Tat";

    reset(): void {};

    nextMove(opponentHistory: Action[]): Action {
        if (opponentHistory.length === 0) { return 'D';}

        if (opponentHistory[opponentHistory.length - 1] === 'D') {
            return 'D';
        } else {
            return 'C';
        }
    } 
}