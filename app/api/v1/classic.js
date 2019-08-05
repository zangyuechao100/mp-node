const Router = require('koa-router')
const router = new Router()

// const { HttpException, ParameterException } = require('./../../../core/http-exception.js')
const { PositiveIntegerValidator } = require('./../../validator/validator')

router.get('/v1/classic/latest', async (ctx, next) => {
})

module.exports = router