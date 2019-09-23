import React from 'react'

export type Outcome = 'eligible' | 'ineligible' | null

const OutcomeIndicator: React.FC<{ outcome: Outcome }> = ({ outcome }) => {
  const outcomeText = outcome // TODO: user friendly words

  const indicatorColor =
    outcome === 'eligible' ? 'green' : outcome === 'ineligible' ? 'red' : 'grey'

  return (
    <div
      title={outcomeText}
      style={{
        borderRadius: '50%',
        height: '2rem',
        width: '2rem',
        backgroundColor: indicatorColor,
      }}></div>
  )
}

export default OutcomeIndicator
