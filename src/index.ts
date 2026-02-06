import { AlwaysCooperate } from './strategies/AlwaysCooperate';
import { AlwaysDeflect } from './strategies/AlwaysDeflect';

const strategyA = new AlwaysCooperate();
const strategyB = new AlwaysDeflect();

console.log(`StrategyA loaded: ${strategyA.name}`);
console.log(`StrategyB loaded: ${strategyB.name}`);
console.log(`First move StrA: ${strategyA.nextMove([])}`);
console.log(`First move StrB: ${strategyB.nextMove([])}`);  

/*
import { Tournament } from './core/Tournament';
import { tournamentConfig } from './config/tournament.config';
import { strategies } from './strategies';

const tournament = new Tournament(strategies, tournamentConfig);
tournament.run();

console.log(tournament.getResults());
*/