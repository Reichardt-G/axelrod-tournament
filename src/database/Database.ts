/* Dependencies: 
npm install sqlite3
npm install sqlite
npm install --save-dev @types/better-sqlite3
*/

import Database from "better-sqlite3";

export const db: Database.Database = new Database("tournament.db");

function isDatabaseInitialized(): boolean {
    
    const tournamentsTable = db.prepare(
        `SELECT 1 FROM sqlite_master
        WHERE type = 'table' AND name = 'tournaments'`
    ).get();

    const matchesTable = db.prepare(
        `SELECT 1 FROM sqlite_master
        WHERE type = 'table' AND name = 'matches'`
    ).get();

    const roundsTable = db.prepare(
        `SELECT 1 FROM sqlite_master
        WHERE type = 'table' AND name = 'rounds'`
    ).get();

    if (tournamentsTable && matchesTable && roundsTable){
        return true;
    } else {
        return false;
    }
}

export function initializeDatabase(): void {

    if (isDatabaseInitialized()) {
        return;
    }

    db.exec(`
        CREATE TABLE IF NOT EXISTS tournaments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            winner TEXT NOT NULL,
            secondPlace TEXT NOT NULL,
            thirdPlace TEXT NOT NULL,
            numberOfParticipants INTEGER NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS matches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tournamentID INTEGER NOT NULL,
            playerA TEXT NOT NULL,
            playerB TEXT NOT NULL,
            scoreA INTEGER NOT NULL,
            scoreB INTEGER NOT NULL,
            winner TEXT NOT NULL,
            numberOfRounds INTEGER NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (tournamentID) REFERENCES tournaments(id)
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS rounds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            matchID INTEGER NOT NULL,
            playerA TEXT NOT NULL,
            playerB TEXT NOT NULL,
            moveA TEXT NOT NULL,
            moveB TEXT NOT NULL,
            winner TEXT NOT NULL, 
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (matchID) REFERENCES matches(id)
        );
    `);
}