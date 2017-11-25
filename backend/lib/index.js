import koa from 'koa'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import cors from 'kcors'
import AWS from 'aws-sdk'
import awsConfig from '../aws-config'

AWS.config.update(awsConfig)

const router = new koaRouter()

router.post('/result', async (ctx, next) => {
  const {request: {body: match}} = ctx
  const s3 = new AWS.S3()
  try {
    await s3.headObject({Bucket: 'overrated', Key: `${match.user}.json`}).promise()
  } catch (ex) {
    ctx.body = 'Could not find user in the system'
    ctx.status = 404
    return
  }

  const {Body} = await s3.getObject({Bucket: 'overrated', Key: `${match.user}.json`}).promise()
  const matchHistory = JSON.parse(new Buffer(Body).toString('utf8'))
  matchHistory.push(match)
  await s3
    .upload({
      ACL: 'public-read',
      Bucket: 'overrated',
      ContentType: 'application/json',
      Key: `${match.user}.json`,
      Body: JSON.stringify(matchHistory),
    })
    .promise()
  ctx.body = JSON.stringify(match)
  ctx.type = 'application/json'
  console.log(`Successfully updated match history for player ${match.user}`)
})

const server = new koa()
server.use(cors())
server.use(koaBody())
server.use(router.routes())

const PORT = 8080

server.listen(PORT)
console.log('Listening on port 8080...')
