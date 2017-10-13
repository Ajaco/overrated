import {makeExecutableSchema} from 'graphql-tools'

import schema from './schema'
import * as resolvers from './resolvers'

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
})

export default executableSchema
