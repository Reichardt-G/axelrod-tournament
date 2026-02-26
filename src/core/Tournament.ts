import { Match } from "./Match";
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
    public play(): void {
        const matches = this.scheduleMatches();

        for (const match of matches) {
            match.play();
        }
    }
}