import koa from 'koa'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import cors from 'koa-cors'
import {graphqlKoa, graphiqlKoa} from 'apollo-server-koa'
import executableSchema from '~/graphql'

const router = new koaRouter()
router.post(
  '/',
  graphqlKoa(({state: {decodedToken: context}}) => ({
    context,
    schema: executableSchema,
    formatError: error => {
      config.logger.warn(error.message)
      return error
    },
  }))
)
const server = new koa()
server.use(cors())
server.use(koaBody())
server.use(router.routes())

const PORT = 3001

server.listen(PORT)
