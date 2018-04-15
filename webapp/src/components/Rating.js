import React, {Component} from 'react'
import Table from 'antd/lib/table'
import Badge from 'antd/lib/badge'
import styled, {css} from 'styled-components'
import Sr from './Sr'
import SRTooltip from './SRTooltip'
import Statistics from './Statistics'

import calculateTimeAgo from '../lib/calculateTimeAgo'

const MATCH_STATUS = {
  Victory: 'success',
  Defeat: 'error',
  Draw: 'warning',
}

const isUnexpectedSRChange = (change, result) => {
  if (change > 0 && result === 'Victory') return false
  if (change < 0 && result === 'Defeat') return false
  if (change === 0 && result === 'Draw') return false

  return true
}

class Rating extends Component {
  state = {
    games: [],
    loading: false,
    currentPage: 0,
  }

  async componentDidMount() {
    this.setState({loading: true})
    const response = await fetch(`https://s3.eu-west-2.amazonaws.com/overrated/${this.props.match.params.userId}.json`)
    if (response.status === 200) {
      const data = await response.json()
      this.setState({games: data.reverse()})
    }
    this.setState({loading: false})
  }

  columns = [
    {
      width: 100,
      title: 'Result',
      dataIndex: 'game.result',
      key: 'result',
      render: result => (
        <span>
          <Badge status={MATCH_STATUS[result]} /> {result}
        </span>
      ),
    },
    {title: 'Map', dataIndex: 'game.map', key: 'map'},
    {title: 'Duration', dataIndex: 'game.duration', key: 'duration', width: 100, align: 'right'},
    {
      title: 'Match completed',
      dataIndex: 'game.completedAt',
      key: 'completedAt',
      align: 'right',
      render: completedAt => <span>{calculateTimeAgo(completedAt)}</span>,
      width: 120,
    },
    {
      align: 'right',
      fixed: 'right',
      width: 150,
      title: 'SR',
      key: 'sr',
      render: ({sr, game: {result}}, _, index) => {
        const actualIndex = 10 * this.state.currentPage + index
        const change =
          actualIndex === this.state.games.length - 1
            ? 0
            : this.state.games[actualIndex].sr - this.state.games[actualIndex + 1].sr
        return (
          <span
            style={{
              color: change > 0 ? '#00a854' : '#f04134',
            }}
          >
            {sr}
            <span style={{marginLeft: 10}}>
              ({change > 0 ? '+' : ''}
              {change})
            </span>
            {isUnexpectedSRChange(change, result) && <SRTooltip change={change} result={result} />}
          </span>
        )
      },
    },
  ]

  render() {
    return (
      <div className="container">
        <div style={{fontSize: 30, fontWeight: 'light', textAlign: 'left', marginBottom: 15}}>
          {this.props.match.params.userId.toUpperCase()}
        </div>
        <Statistics matches={this.state.games} />
        <Sr matches={this.state.games} />
        <Table
          onChange={({current}) => this.setState({currentPage: current - 1})}
          rowKey={r => r.game.id}
          loading={this.state.loading}
          dataSource={this.state.games}
          columns={this.columns}
        />
      </div>
    )
  }
}

export default Rating
