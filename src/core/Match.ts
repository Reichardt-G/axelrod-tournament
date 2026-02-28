import { Strategy } from "./Strategy";
import { PayOffMatrix, Action } from "./PayOffMatrix";
import { MatchResult } from "../stats/Result";

export class Match{
    constructor(
        private playerA: Strategy,
        private playerB: Strategy,
        private rounds: number
    ) {}
    
    public play(): MatchResult {
        
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

            // Results are computed
            const [roundScoreA, roundScoreB] = PayOffMatrix.getScore(moveA, moveB);
            scoreA = scoreA + roundScoreA;
            scoreB = scoreB + roundScoreB;

            // Feeding the history
            historyA.push(moveA);
            historyB.push(moveB);
            historyScoreA.push(roundScoreA);
            historyScoreB.push(roundScoreB);
        } 

        return {
            playerAName: this.playerA.name,
            playerBName: this.playerB.name,
            scoreA,
            scoreB,
            movehistoryA: historyA,
            movehistoryB: historyB,
            scoreHistoryA: historyScoreA,
            scoreHistoryB: historyScoreB
        };
    }
}