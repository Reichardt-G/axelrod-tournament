import { Action } from "../core/PayOffMatrix";

export interface MatchResult {
    playerAName: string;
    playerBName: string;
    scoreA: number;
    scoreB: number;
    movehistoryA: Action[];
    movehistoryB: Action[];
    scoreHistoryA: number[];
    scoreHistoryB: number[];
}

export interface TournamentResult {
    playerName: string;
    totalScore: number;
    totalWins: number;
    totalLosses: number;
    totalTies: number;
}