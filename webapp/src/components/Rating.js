import React, {Component} from 'react'
import Table from 'antd/lib/table'
import Badge from 'antd/lib/badge'
import styled, {css} from 'styled-components'
import moment from 'moment'
import 'moment/locale/nb'
import Sr from './Sr'

const Arrow = styled.i`
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 8px;

  ${props =>
    props.win
      ? css`
          transform: rotate(-135deg);
          -webkit-transform: rotate(-135deg);
          border-color: #00a854;
        `
      : css`
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          border-color: #f04134;
        `};
`

const MATCH_STATUS = {
  Victory: 'success',
  Defeat: 'error',
  Draw: 'warning',
}

class Rating extends Component {
  state = {
    games: [],
    loading: false,
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
    {title: 'Duration', dataIndex: 'game.duration', key: 'duration'},
    {
      title: 'Match completed',
      dataIndex: 'game.completedAt',
      key: 'completedAt',
      render: completedAt => <span>{moment(completedAt).format('HH:mm DD.MM.YYYY')}</span>,
      sorter: (a, b) => new Date(b.game.completedAt) - new Date(a.game.completedAt),
    },
    {
      title: 'SR',
      key: 'sr',
      render: ({sr, game: {result}}) => (
        <span>
          {sr} {result !== 'Draw' && <Arrow win={result === 'Victory'} />}
        </span>
      ),
    },
  ]
  render() {
    return (
      <div className="container">
        <h1 style={{textAlign: 'left', marginBottom: 15}}>Match history for {this.props.match.params.userId}</h1>
        <Sr matches={this.state.games} />
        <Table
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
