const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { Forbbiden } = require('./../core/http-exception')
class Auth {
  
  constructor () {

  }

  get m () {
    return async (ctx, next) => {
      const token = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      if (!token || !token.name) {
        throw new Forbbiden()
      }
      try {
        jwt.verify(token.name, global.config.security.secretKey)
      } catch (e) {
        // token不合法或者已经过期
        if (e.name === 'TokenExpiredError') {
          errMsg = 'token过期'
        }
        throw new Forbbiden(msg)
      }
      
      ctx.body = {
        token
      }
    }
  }

}

module.exports = Auth