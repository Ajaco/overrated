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
        <Switch>
          <Route path="/:userId" component={Rating} />
        </Switch>
      </div>
    </LocaleProvider>
  )
}

export default App
