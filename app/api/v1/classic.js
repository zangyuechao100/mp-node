const Router = require('koa-router')
const Auth = require('./../../../middlewares/auth')
const router = new Router({
    prefix: '/v1/classic'
})

// const { HttpException, ParameterException } = require('./../../../core/http-exception.js')
const { PositiveIntegerValidator } = require('./../../validator/validator')

router.get('/latest', new Auth().m, async (ctx, next) => {
  ctx.body = {
    uid: ctx.auth.uid
  }
})

module.exports = router