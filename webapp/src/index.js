import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components'
import './App.css'

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3001',
  }),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
