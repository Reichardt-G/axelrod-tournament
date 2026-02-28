import { Strategy } from "./Strategy";
import { PayOffMatrix, Action } from "./PayOffMatrix";
import { matchLogs, tournamentLogs } from "..";

export class Match{
    constructor(
        private playerA: Strategy,
        private playerB: Strategy,
        private rounds: number
    ) {}
    
    play() {
        if (matchLogs) {console.log(`\nPlaying now: ${this.playerA.name} x ${this.playerB.name} - FOR ${this.rounds} rounds`);}
        
        let scoreA = 0;
        let scoreB = 0;

        // Each of the strategies must see the prior move of the other algorithm
        const historyA: Action[] = [];
        const historyB: Action[] = [];

        const historyScoreA: number[] = [];
        const historyScoreB: number[] = [];
        
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

            historyScoreA.push(roundScoreA);
            historyScoreB.push(roundScoreB);
        } 

        if (tournamentLogs || matchLogs) {
            console.log(`["${this.playerA.name}" x "${this.playerB.name}"]:`);
            if (matchLogs) {
                for (let i = 0; i < historyA.length && i < historyB.length; i++){
                    console.log(`- Round ${i+1}: [${historyA[i]} x ${historyB[i]}] - Scores: [${historyScoreA[i]} x ${historyScoreB[i]}]`);
                }
            }
            console.log(`- Final Score: [${scoreA} x ${scoreB}]\n`);
        }
    }
}