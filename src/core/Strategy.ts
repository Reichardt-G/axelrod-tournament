export type Action = 'C' | 'D';

export interface Strategy {
  /** Human-readable strategy name */
  name: string;

  /** Called before each new match */
  reset(): void;

  /**
   * Decide the next move.
   * @param opponentHistory All opponent previous actions
   */
  nextMove(opponentHistory: Action[]): Action;
}
