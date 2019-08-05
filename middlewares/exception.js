const { HttpException } = require('./../core/http-exception.js')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    if (global.config.environment === 'dev') {
      throw error
    }
    if (isHttpException) {
      ctx.status = error.code
      ctx.body = {
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
        message: error.msg
      }
    } else {
      ctx.status = 500,
      ctx.body = {
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`,
        message: '服务器发生了一个错误'
      }
    }
  }
}

module.exports = catchError