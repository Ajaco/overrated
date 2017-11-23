import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Rating from './Rating'
import LocaleProvider from 'antd/lib/locale-provider'
import 'antd/dist/antd.css'
import enUS from 'antd/lib/locale-provider/en_US'
const App = () => {
  return (
    <LocaleProvider locale={enUS}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Overrated</h1>
        </header>
        <Switch>
          <Route path="/:userId" component={Rating} />
        </Switch>
      </div>
    </LocaleProvider>
  )
}

export default App
