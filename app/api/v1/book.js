const Router = require('koa-router')
const router = new Router()

router.get('/v1/book/latest', async (ctx, next) => {
  ctx.body = {
    key: 'book'
  }
})

router.post('/v1/:id/book/post', async (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body
  ctx.body = {
    key: 'book'
  }
})

module.exports = router