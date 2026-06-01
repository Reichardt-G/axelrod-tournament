import { db } from "./Database";
import { MatchResult, SimplifiedScoreTable } from "../stats/Result";

/*
const insertTournament = db.prepare(
    `INSERT INTO tournament (
        winner,
        secondPlace,
        thirdPlace,
        numberOfParticipants
    )
    VALUES (?, ?, ?, ?)`
);

const insertMatch = db.prepare(
    `INSERT INTO matches (
        tournamentID,
        playerA,
        playerB,
        scoreA,
        scoreB,
        winner,
        numberOfRounds
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`
);

const insertRound = db.prepare(
    `INSERT INTO rounds (
        matchID,
        playerA,
        playerB,
        moveA,
        moveB,
        winner,
    )
    VALUES (?, ?, ?, ?, ?, ?)`
);
*/

export function saveTournamentResults(matchesData: MatchResult[], tournamentData: SimplifiedScoreTable[]): void {

    //INSERT tournament Data

    const winner = tournamentData.find(p => p.position === 1)?.playerName;
    const secondPlace = tournamentData.find(p => p.position === 2)?.playerName;
    const thirdPlace = tournamentData.find(p => p.position === 3)?.playerName;
    const numberOfParticipants = tournamentData.length;

    console.log('MOCKING INSERT DATA!!!');

    /*
    const result = insertTournament.run(
        winner,
        secondPlace,
        thirdPlace,
        numberOfParticipants
    );
    */

    /*
    const tournamentID = Number(result.lastInsertRowid);
    */

    console.log(`SAVING tournament data:`);
    console.log(`
        winner: ${winner} | 
        secondPlace: ${secondPlace} |
        thirdPlace: ${thirdPlace} | 
        numberOfParticipants: ${numberOfParticipants}
    `)

    // INSERT matches & rounds Data

    for (const match of matchesData) {

        let matchWinner = 'TIE';
        
        if (match.scoreA > match.scoreB) {
            matchWinner = match.playerAName;
        } else if (match.scoreB > match.scoreA) {
            matchWinner = match.playerBName;
        }

        const numberOfRounds = match.movehistoryA.length;

        /*
        const matchResult = insertMatch.run(
            tournamentID,
            match.playerAName,
            match.playerBName,
            match.scoreA,
            match.scoreB,
            matchWinner,
            numberOfRounds
        ); 
        */

        console.log(`-SAVING match data:`);
        console.log(`
            tournamentID: n.a. | 
            playerA: ${match.playerAName} | 
            playerB: ${match.playerBName} |
            playerAScore: ${match.scoreA} |
            playerBScore: ${match.scoreB} |
            matchWinner: ${matchWinner} |
            numberOfRounds: ${numberOfRounds}
        `)

        /*
        const matchID = Number(matchResult.lastInsertRowid);
        */

        // round loop
        for (let i = 0; i < match.movehistoryA.length; i++) {

            // determine round winner
            let roundWinner = 'TIE';

            if (match.scoreHistoryA[i]! > match.scoreHistoryB[i]!){
                roundWinner = match.playerAName;
            } else if (match.scoreHistoryA[i]! < match.scoreHistoryB[i]!){
                roundWinner = match.playerBName; 
            }

            /*
            insertRound.run(
                matchID,
                match.playerAName,
                match.playerBName,
                match.movehistoryA[i],
                match.movehistoryB[i],
                roundWinner
            )
            */

            console.log(`--SAVING round data:`);
            console.log(`
                matchID: n.a. | 
                playerA: ${match.playerAName}; 
                roundMoveA: ${match.movehistoryA[i]}; 
                scoreA: ${match.scoreHistoryA[i]} | 
                playerB: ${match.playerBName}; 
                roundMoveB: ${match.movehistoryB[i]}; 
                scoreB: ${match.scoreHistoryB[i]} |
                roundWinner: ${roundWinner}
            `)
        }
    }
}