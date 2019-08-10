const Router = require('koa-router')
const { TokenValidator } = require('./../../validator/validator')
const { LoginType } = require('./../../lib/enum')
const User = require('./../../models/user')
const { ParameterException } = require('./../../../core/http-exception')
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PROGRAM:
      break
    case LoginType.USER_MOBILE:
      break
    default:
      throw new Error('没有处理逻辑')
  }
})

async function emailLogin (account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
}

module.exports = router