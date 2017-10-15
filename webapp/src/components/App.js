import React from 'react'
import {gql, graphql} from 'react-apollo'

const App = ({data: {loading, users}}) => {
  if (loading) return <div>LOADING!</div>

  console.log(users)
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">Data from gql {users[0].name}</p>
    </div>
  )
}

const query = gql`
  query {
    users {
      id
      name
    }
  }
`
export default graphql(query)(App)
