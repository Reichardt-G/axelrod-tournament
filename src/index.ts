import { AlwaysCooperate } from './strategies/AlwaysCooperate';

const strategy = new AlwaysCooperate();

console.log(`Strategy loaded: ${strategy.name}`);
console.log(`First move: ${strategy.nextMove([])}`);