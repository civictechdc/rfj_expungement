const { getStateMachine } = require('../libs/state-machines');

const machine = getStateMachine('actualInnocenceAnalysis');

let state = machine.state;

console.log('We are going to show off the case of a non-eligible case\n' +
  'The initial state of this machine is convited.\n' +
  'In this state it is necessary to ask if the case ended in a convition.\n' +
  `Initial State: ${state.value}\n`);

console.log('Answering YES to conviction');
state = machine.send('YES');
console.log(`Current State: ${state.value}\n`);

console.log('Restarting the machine.\n');
state = machine.send('RESTART');

console.log('=========================================================\n');

console.log('We are going to show off the case of an eligible case\n' +
  'The initial state of this machine is convited.\n' +
  'In this state it is necessary to ask if the case ended in a convition.\n' +
  `Initial State: ${state.value}\n`);

console.log('Answering NO to conviction');
state = machine.send('NO');
console.log(`Current State: ${state.value}\n`);

console.log('Answering YES to "Has it been more than 4 years since the termination of the case?"');
state = machine.send('YES');
console.log(`Current State: ${state.value}\n`);

console.log('Restarting the machine.');
state = machine.send('RESTART');
console.log(`Current State: ${state.value}`);