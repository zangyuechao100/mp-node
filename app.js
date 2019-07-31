const Koa = require('koa')
const Router = require('koa-router')
const requireDirctory = require('require-directory')

const app = new Koa()

requireDirctory(module, './api/v1', {
  visit: whenLoadModule
})

function whenLoadModule(obj) {
  if (obj instanceof Router) {
    app.use(obj.routes())
  }
}

app.listen(3000)