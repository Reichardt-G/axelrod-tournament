import { Match } from "./Match";
import { MatchResult, TournamentResult } from "../stats/Result";
import { Strategy } from "./Strategy";

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

    // Execution only
    public play(): [MatchResult[], TournamentResult[]] {
        const matches = this.scheduleMatches();
        const matchResults: MatchResult[] = [];
        const tournamentResults: TournamentResult[] = [];

        for (const match of matches) {
            // Playing the match and storing the result
            matchResults.push(match.play());

            // Updating the tournament results
            
        }

        return [matchResults, tournamentResults];
    }
}