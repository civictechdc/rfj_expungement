const { Machine, interpret } = require('xstate');

const actualInnocenceAnalysis = Machine({
  id: '16-802-actual-innocence-analysis',
  initial: 'convicted',
  states: {
    convicted: { // Was the client convicted
      on: {
        YES: 'notEligible',
        NO: 'convictionTime'
      }
    },
    convictionTime: { // Has it been more than four years since case termination
      on: {
        YES: 'proveInnocenceClearConvincingEvidence',
        NO: 'proveInnocenceProponderanceEvidence',
        RESTART: 'convicted'
      }
    },
    notEligible: {
      on: {
        RESTART: 'convicted'
      }
    },
    proveInnocenceClearConvincingEvidence: {
      on: {
        RESTART: 'convicted'
      }
    },
    proveInnocenceProponderanceEvidence: {
      on: {
        RESTART: 'convicted'
      }
    }
  }
});

function getStateMachine(machine) {
  if(machine === 'actualInnocenceAnalysis') {
    return interpret(actualInnocenceAnalysis)
      .onTransition(state => {
        const eligibleMsg16802 = 'This case is ELIGIBLE UNDER 16-802 if the client can prove that he or she is innocent';
        if(state.value === 'notEligible') {
          console.log('Your client is not eligible.');
        }
        if(state.value === 'proveInnocenceClearConvincingEvidence') {
          console.log(`${eligibleMsg16802}. The burden of proof is clear and convincing evidence.`);
        }
        if(state.value === 'proveInnocenceProponderanceEvidence') {
          console.log(`${eligibleMsg16802}. The burden of proof is preponderance of the evidence.`);
        }
      })
      .start();
  }
}

module.exports = {
  getStateMachine
};
