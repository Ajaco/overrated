import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {App} from './components'
import './App.css'

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo'
import registerServiceWorker from './registerServiceWorker'

// http://dev.apollodata.com/react/auth.html#Header
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3001',
})

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {} // Create the header object if needed.
      }

      const token = 'tokenGoesHere'
      req.options.headers.authorization = token ? `Bearer ${token}` : null
      next()
    },
  },
])

const client = new ApolloClient({
  networkInterface,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
