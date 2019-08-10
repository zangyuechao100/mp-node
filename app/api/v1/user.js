const Router = require('koa-router')
const { RegisterValidator } = require('./../../validator/validator')
const User = require('./../../models/user')
const { Success } = require('./../../../core/http-exception')
const router = new Router({
	prefix: '/v1/user'
})

router.post('/register', async (ctx, next) => {
	const v = await new RegisterValidator().validate(ctx)
	const uesr = {
		email: v.get('body.email'),
		password: v.get('body.password1'),
		nickname: v.get('body.nickname')
	}
	await User.create(uesr)
	// 把success也看作一个异常
	throw new Success()
})

module.exports = router