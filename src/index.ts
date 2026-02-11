import { Match } from './core/Match';
import { strategies } from './strategies/index';

const PlayerA = strategies[0];
const PlayerB = strategies[1];

if (PlayerA === undefined) throw new Error ('PlayerA is undefined!');
if (PlayerB === undefined) throw new Error ('PlayerB is undefined!');

const newMatch = new Match(
    new PlayerA(), 
    new PlayerB(), 
    3
);

newMatch.play();