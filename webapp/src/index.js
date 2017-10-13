import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {App} from './components'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000',
  }),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
