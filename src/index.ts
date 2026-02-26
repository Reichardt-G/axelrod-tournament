import { Match } from './core/Match';
import { Tournament } from './core/Tournament';
import { AlwaysCooperate } from './strategies/AlwaysCooperate';
import { AlwaysDeflect } from './strategies/AlwaysDeflect';
import { strategies } from './strategies/index';

/*
const strategiesInstances = [
    new AlwaysCooperate(),
    new AlwaysDeflect()
]
*/

// This will instantiate all the strategies and store them in an array, which will be passed to the tournament.
let strategiesInstances = [];
for (let strategyClass of strategies) {
    strategiesInstances.push(new strategyClass());
}

const tournament = new Tournament(strategiesInstances, 3, true);
tournament.play();

