import { Match } from "./Match";
import { MatchResult, ScoreBoard, SimplifiedScoreTable } from "../stats/Result";
import { Strategy } from "./Strategy";
import { create } from "node:domain";

export class Tournament{
    constructor(
        private strategies: Strategy[],
        private roundsPerMatch: number,
        private allowSelfPlay: boolean
    ){}

    private scheduleMatches(): Match[] {
        const matches: Match[] = [];
        const total = this.strategies.length;

        for (let i = 0; i < total; i++) {

            const playerA = this.strategies[i]!;
            const start = this.allowSelfPlay ? i : i + 1;

            for (let j = start; j < total; j++) {

                const playerB = this.strategies[j]!;

                matches.push(
                    new Match(playerA, playerB, this.roundsPerMatch)
                );
            }
        }

        return matches;
    }

    private createRankingBoard(): ScoreBoard[] {
        const blankScoreBoard: ScoreBoard[] = [];

        for (const strategy of this.strategies) {
            blankScoreBoard.push({
                playerName: strategy.name,
                totalScore: 0,
                totalWins: 0,
                totalLosses: 0,
                totalTies: 0
            });
        }

        return blankScoreBoard;
    }

    private createRankingTable(scoreboard: ScoreBoard[]): SimplifiedScoreTable[] {
        const result: SimplifiedScoreTable[] = [];
        let pos = 0;
        let memoryScore: number | null = null;

        const temp = scoreboard.map(player => ({
            playerName: player.playerName,
            points: player.totalScore
        }));

        while (temp.length > 0) {
            let maxIndex = 0;

            for (let i = 1; i < temp.length; i++) {
                if (temp[i]!.points > temp[maxIndex]!.points) {
                    maxIndex = i;
                }
            }

            const best = temp[maxIndex]!;

            if (memoryScore === null || memoryScore !== best.points) {
                pos++;
            }

            result.push({
                position: pos,
                playerName: best.playerName,
                points: best.points
            });

            memoryScore = best.points;
            temp.splice(maxIndex, 1);
        }

        return result;
    }

    // Execution only
    public play(): [MatchResult[], ScoreBoard[], SimplifiedScoreTable[]] {
        const matches = this.scheduleMatches();
        const matchResults: MatchResult[] = [];
        const tournamentResults = this.createRankingBoard();

        for (const match of matches) {
            // Playing the match and storing the result
            matchResults.push(match.play());

            // Updating the tournament results
            const lastResult = matchResults[matchResults.length - 1]!;
            let winner = '';
            if (lastResult.scoreA > lastResult.scoreB) {
                // PlayerA wins
                winner = 'A';
            } else if (lastResult.scoreA < lastResult.scoreB) {
                // PlayerB wins
                winner = 'B';
            } else {
                // Tie
                winner = 'T';
            }
            let find = 0
            for (const player of tournamentResults) {
                if (player.playerName === lastResult.playerAName) {
                    find++;
                    player.totalScore = player.totalScore + lastResult.scoreA;
                    if (winner === 'A') {
                        player.totalWins++;
                    } else if (winner === 'B') {
                        player.totalLosses++;
                    } else {
                        player.totalTies++;
                    }
                }
                if (player.playerName === lastResult.playerBName) {
                    find++;
                    player.totalScore = player.totalScore + lastResult.scoreB;
                    if (winner === 'B') {
                        player.totalWins++;
                    } else if (winner === 'A') {
                        player.totalLosses++;
                    } else {
                        player.totalTies++;
                    }
                }
                if (find === 2) { break; }
            }
        }

        return [matchResults, tournamentResults, this.createRankingTable(tournamentResults)];
    }
}