import React, {Component} from 'react'
import Table from 'antd/lib/table'
import Badge from 'antd/lib/badge'
import moment from 'moment'
import 'moment/locale/nb'

const MATCH_STATUS = {
  Victory: 'success',
  Defeat: 'error',
  Draw: 'warning',
}

class Rating extends Component {
  state = {
    games: [],
  }

  async componentDidMount() {
    const response = await fetch(
      `https://s3.eu-west-2.amazonaws.com/overrated/${this.props.match.params
        .userId}.json`
    )
    const data = await response.json()
    this.setState({games: data})
    console.log(this.state.games)
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
      render: completedAt => (
        <span>{moment(completedAt).format('hh:mm DD.MM.YYYY')}</span>
      ),
      sortOrder: 'descend',
      sorter: (a, b) =>
        new Date(a.game.completedAt) > new Date(b.game.completedAt),
    },
    {title: 'SR', dataIndex: 'sr', key: 'sr'},
  ]
  render() {
    return (
      <div class="container">
        <h1 style={{textAlign: 'left', marginBottom: 15}}>
          Match history for {this.props.match.params.userId}
        </h1>
        <Table
          rowKey="game.id"
          loading={this.state.games.length === 0}
          dataSource={this.state.games}
          columns={this.columns}
        />
      </div>
    )
  }
}

export default Rating