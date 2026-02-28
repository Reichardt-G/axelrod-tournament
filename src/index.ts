import { Tournament } from './core/Tournament';
import { strategies } from './strategies/index';

// This will instantiate all the strategies and store them in an array, which will be passed to the tournament.
let strategiesInstances = [];
for (let strategyClass of strategies) {
    strategiesInstances.push(new strategyClass());
}

const tournament = new Tournament(strategiesInstances, 5, false);
const [matchResults, tournamentRanking] = tournament.play();

let i = 1;
for (const result of matchResults) {
    console.log(`Match ${i++}: \n${result.playerAName} (${result.scoreA}) x ${result.playerBName} (${result.scoreB})`);
    console.log('');
}