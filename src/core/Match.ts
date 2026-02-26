import { Strategy } from "./Strategy";
import { PayOffMatrix, Action } from "./PayOffMatrix";

export class Match{
    constructor(
        private playerA: Strategy,
        private playerB: Strategy,
        private rounds: number
    ) {}
    
    play() {
        console.log(`\nPlaying now: ${this.playerA.name} x ${this.playerB.name} - FOR ${this.rounds} rounds`);
        
        let scoreA = 0;
        let scoreB = 0;

        // Each of the strategies must see the prior move of the other algorithm
        const historyA: Action[] = [];
        const historyB: Action[] = [];
        
        for (let i = 1; i <= this.rounds; i++) {

            // Moves of each player are done and might depend on the opposing party's history
            let moveA = this.playerA.nextMove(historyB);
            let moveB = this.playerB.nextMove(historyA);

            // Feeding the history
            historyA.push(moveA);
            historyB.push(moveB);

            // Results are computed
            const [roundScoreA, roundScoreB] = PayOffMatrix.getScore(moveA, moveB);
            scoreA = scoreA + roundScoreA;
            scoreB = scoreB + roundScoreB;

            // This might be useful for debugging later with more strategies
            /*
            console.log(`=> ROUND ${i}:
                - Player "${this.playerA.name}" | played "${moveA === 'C' ? 'Cooperate' : 'Deflect'}" | scored "${roundScoreA}";
                - Player "${this.playerB.name}" | played "${moveB === 'C' ? 'Cooperate' : 'Deflect'}" | scored "${roundScoreB}".`);
            */
        } 
        console.log(`["${this.playerA.name}" x "${this.playerB.name}"]:`);
        for (let i = 0; i < historyA.length && i < historyB.length; i++){
            console.log(`- Round ${i+1}: [${historyA[i]} x ${historyB[i]}]`);
        }
        console.log(`- Final Score: [${scoreA} x ${scoreB}]`);
    }
}