import React from 'react'
import {gql, graphql} from 'react-apollo'
import {Link} from 'react-router-dom'

const User = ({data: {loading, user}}) => {
  if (loading) return <div>Loading...</div>

  return (
    <div>
      {user.name} {user.id}
      <Link to="/users">Go to users</Link>
    </div>
  )
}

const query = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      id
      name
    }
  }
`

// how to mutation:
// const mutation = gql`
//   mutation updateUser($name: String) {
//     updateUser(name: $name) {
//       id
//       name
//     }
//   }
// `

//mer lesbar versjon:
// const options = hocProps => {
//   return {calculatedField: hocProps.foo + hocProps.bar}
// }
// export default graphql(query, options)(User)
export default graphql(query, {
  options: ({match: {params: {userId}}}) => {
    return {variables: {userId}}
  },
})(User)
