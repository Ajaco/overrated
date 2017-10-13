import React from 'react'
import {gql, graphql} from 'react-apollo'

const App = ({data: {loading, hello}}) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">Data from gql: {hello}</p>
    </div>
  )
}

const query = gql`
  query {
    hello
  }
`
export default graphql(query)(App)
