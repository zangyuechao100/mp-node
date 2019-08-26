const util = require('util')
const axios = require('axios')
const { AuthFaild } = require('./../../core/http-exception')
const User = require('./../models/user')
const Auth = require('./../../middlewares/auth')
const { generateToken } = require('./../../core/util')
class WXManager {
  static async codeToToken (code) {
    const url = util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code)
    const result = await axios.get(url)

    if (result.status !== 200) {
      throw new AuthFaild('openId获取失败')
    }

    const { errcode, openid, errmsg } = result.data

    if (errcode) {
      throw new AuthFaild(`openid获取失败, errmsg: ${errmsg}`)
    }

    let user = await User.getUserByOpenid(openid)

    if (!user) {
      user = await User.registerByOpenid(openid)
    }

    return generateToken(user.id, Auth.USER)
  }
}

module.exports = WXManager