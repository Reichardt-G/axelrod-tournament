import { Match } from './core/Match';
import { Tournament } from './core/Tournament';
import { AlwaysCooperate } from './strategies/AlwaysCooperate';
import { AlwaysDeflect } from './strategies/AlwaysDeflect';
import { strategies } from './strategies/index';

/* 
    Match logs overrides tournamentLogs. 
    If matchLogs is true, it will log the moves and scores of each round, 
    while tournamentLogs will only log the final scores of each match and the overall ranking of strategies at the end of the tournament.
*/
export const matchLogs = false;
export const tournamentLogs = true; 

// This will allow strategies to see the history of the previous match, which might be useful for some strategies that want to adapt based on the performance of other strategies in the tournament.
export const historyFromPreviousMatch = false; 

// This will instantiate all the strategies and store them in an array, which will be passed to the tournament.
let strategiesInstances = [];
for (let strategyClass of strategies) {
    strategiesInstances.push(new strategyClass());
}

const tournament = new Tournament(strategiesInstances, 3, true);
tournament.play();

