import { Tournament } from './core/Tournament';
import { strategies } from './strategies/index';

/* 
    Match logs overrides tournamentLogs. 
    If matchLogs is true, it will log the moves and scores of each round, 
    while tournamentLogs will only log the final scores of each match and the overall ranking of strategies at the end of the tournament.
*/
export const matchLogs = false;
export const tournamentLogs = true; 

// This will instantiate all the strategies and store them in an array, which will be passed to the tournament.
let strategiesInstances = [];
for (let strategyClass of strategies) {
    strategiesInstances.push(new strategyClass());
}

const tournament = new Tournament(strategiesInstances, 5, false);
tournament.play();

