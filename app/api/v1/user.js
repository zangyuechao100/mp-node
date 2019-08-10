const Router = require('koa-router')
const { RegisterValidator } = require('./../../validator/validator')
const User = require('./../../models/user') 
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
	const result = await User.create(uesr)
	console.log(result)
})

module.exports = router