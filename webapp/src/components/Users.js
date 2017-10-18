import React from 'react'
import {gql, graphql} from 'react-apollo'

const Users = ({data: {loading, users}}) => {
  if (loading) return <div>Loading...</div>
  return users.map((user, index) => <div key={index}>{user.name}</div>)
}

const query = gql`
  query {
    users {
      id
      name
    }
  }
`

export default graphql(query)(Users)
