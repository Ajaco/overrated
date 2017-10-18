import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import User from './User'
import Users from './Users'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/user/:userId" component={User} />
        <Redirect to="/users" />
      </Switch>
    </div>
  )
}

export default App
