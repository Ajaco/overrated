import {makeExecutableSchema} from 'graphql-tools'

import schema from './schema'
import * as resolvers from './resolvers' // http://dev.apollodata.com/tools/graphql-tools/resolvers.html#Resolver-function-signature

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: {...resolvers},
})

export default executableSchema
