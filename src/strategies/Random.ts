//This strategy will randomly choose to cooperate or defect in each round.
import { Strategy, Action } from '../core/Strategy';

export class Random implements Strategy{
    name = 'Random';

    reset(): void{};

    nextMove(opponentHistory: Action[]): Action {
        return Math.random() < 0.5 ? 'D' : 'C';
    }
}