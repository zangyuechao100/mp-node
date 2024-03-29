const Router = require('koa-router')
const { TokenValidator } = require('./../../validator/validator')
const { LoginType } = require('./../../lib/enum')
const User = require('./../../models/user')
const { generateToken } = require('./../../../core/util')
const { Auth } = require('./../../../middlewares/auth')
const WXManager = require('./../../service/wx')

const { ParameterException } = require('./../../../core/http-exception')
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)
  let token = ''
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MOBILE:
      break
  }
  ctx.body = {
    token
  }
})

async function emailLogin (account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  const token = generateToken(user.id, Auth.USER)
  return token
}

module.exports = router