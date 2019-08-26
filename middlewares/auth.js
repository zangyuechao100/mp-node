const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { Forbbiden } = require('./../core/http-exception')
class Auth {
  
  constructor (level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
  }

  get m () {
    return async (ctx, next) => {
      const token = basicAuth(ctx.req)
      let decode = ''
      let errMsg = 'token不合法'
      if (!token || !token.name) {
        throw new Forbbiden()
      }
      try {
        decode = jwt.verify(token.name, global.config.security.secretKey)
      } catch (e) {
        // token不合法或者已经过期
        if (e.name === 'TokenExpiredError') {
          errMsg = 'token过期'
        }
        throw new Forbbiden(errMsg)
      }
      if (decode.scope < this.level) {
        throw new Forbbiden('权限不够')
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }

}

module.exports = Auth