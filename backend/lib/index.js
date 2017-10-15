import koa from 'koa'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import cors from 'koa-cors'
import {graphqlKoa, graphiqlKoa} from 'apollo-server-koa'
import executableSchema from '~/graphql'

const router = new koaRouter()

//authorization:
router.use('/', async (context, next) => {
  const authHeader = context.request.get('authorization')

  if (authHeader) {
    const [tokenType, encodedToken] = authHeader.split(/\s+/)
    if (tokenType !== 'Bearer') {
      context.throw(401, `Unknown token type: ${tokenType}`)
    }

    context.state.token = authHeader
  }

  return next()
})

router.post(
  '/',
  graphqlKoa(ctx => {
    return {
      context: ctx.state.token,
      schema: executableSchema,
      formatError: error => {
        console.log(error.message)
        return error
      },
    }
  })
)
const server = new koa()
server.use(cors())
server.use(koaBody())
server.use(router.routes())

const PORT = 3001

server.listen(PORT)
