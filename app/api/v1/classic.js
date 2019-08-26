const Router = require('koa-router')
const Auth = require('./../../../middlewares/auth')
let auth = new Auth()
const router = new Router({
    prefix: '/v1/classic'
})

// const { HttpException, ParameterException } = require('./../../../core/http-exception.js')
const { PositiveIntegerValidator } = require('./../../validator/validator')

router.get('/latest', auth.m, async () => {
  ctx.body = {
    success: 123
  }
})

module.exports = router