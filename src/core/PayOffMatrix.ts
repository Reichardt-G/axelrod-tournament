// The 2 possible actions are 'C' = Cooperate and 'D' = Deflect.
export type Action = 'C' | 'D';

/* 
    Following the classic prisioner's dillema, we have scores based on the interaction between two algorithms.
    - ('C' - 'C') If both cooperate, each receives 3 points. This simulates a cooperative environment where each gets their share. 
    - ('C' - 'D') If one chooses coperation while the other deflects, the deflecting gets max score of 5 points while the other receives 0. 
    This simulates "taking advantage of another".
    - ('D' - 'D') If both deflect, each receives 1 point. This simulates a hostile environment of low trust which results in low gain.
*/
export class PayOffMatrix {
    static getScore(a: Action, b: Action): [number, number]{
        if (a === 'C' && b === 'C') return [3, 3];
        if (a === 'C' && b === 'D') return [0, 5];
        if (a === 'D' && b === 'C') return [5, 0];
        return [1, 1];
    }
}