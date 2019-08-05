const Router = require('koa-router')
const requireDirctory = require('require-directory')

class InitManager {

  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.lodeConfig()
  }

  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirctory(module, apiDirectory, {
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  static lodeHttpException () {
    // 可以把所有类挂在到global上，但是不推荐
    const errors = require('./http-exception')
    global.errs = errors
  }

  static lodeConfig () {
    const configDirectory = `${process.cwd()}/config/config.js`
    const config = require(configDirectory)
    global.config = config
  }
}

module.exports = InitManager