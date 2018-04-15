import React from 'react'
import {round} from 'lodash'

const Statistics = ({matches}) => {
  if (!matches || matches.length === 0) return false

  const {wins, defeats, draws, peak, floor} = matches.reduce(
    (acc, {sr, game}) => {
      if (game.result === 'Victory') acc.wins += 1
      if (game.result === 'Defeat') acc.defeats += 1
      if (game.result === 'Draw') acc.draws += 1
      if (sr > acc.peak) acc.peak = sr
      if (!acc.floor) acc.floor = sr
      if (sr < acc.floor) acc.floor = sr
      return acc
    },
    {wins: 0, defeats: 0, draws: 0, peak: 0, floor: 0}
  )

  const netWin = matches[0].sr - matches[matches.length - 1].sr
  const avgChange = round(netWin / matches.length, 2)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
        marginBottom: 10,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{fontSize: 60, marginRight: 10}}>{round(wins / matches.length * 100, 2)}%</div>
        <div>
          <div style={{color: '#00a854'}}>{wins} victories</div>
          <div style={{color: '#f04134'}}>{defeats} defeats</div>
          <div style={{color: '#ffbf00'}}>{draws} draws</div>
        </div>
      </div>
      <div>
        <div style={{textAlign: 'right'}}>
          Highest SR:<span style={{marginLeft: 5, color: '#00a854'}}>{peak}</span>
        </div>
        <div style={{textAlign: 'right'}}>
          Lowest SR:<span style={{marginLeft: 5, color: '#f04134'}}>{floor}</span>
        </div>
        <div style={{textAlign: 'right'}}>
          Average rating change per game:<span style={{marginLeft: 5, color: avgChange > 0 ? '#00a854' : '#f04134'}}>
            {avgChange}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Statistics
