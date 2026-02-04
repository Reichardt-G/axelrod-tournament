import { Strategy, Action } from '../core/Strategy';

export class AlwaysCooperate implements Strategy {
  name = 'Always Cooperate';

  reset(): void {}

  nextMove(_opponentHistory: Action[]): Action {
    return 'C';
  }
}