const { LinValidator, Rule } = require('./../../core/lin-validator.js')
const User = require('./../models/user')

const { LoginType } = require('./../lib/enum')

class PositiveIntegerValidator extends LinValidator {
  constructor () {
    super()
    this.id = [
      new Rule('isInt', '需要是正整数', {min: 1})
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor () {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符。',
      {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '名称不符合长度规范',
      {
        min: 6,
        max: 12
      })
    ]
  }

  validatePassword (vals) {
    const { password1, password2 } = vals.body
    if (password1 !== password2) {
      throw new Error('两个密码必须相同')
    }
  }

  async validateEmail (vals) {
    const { email } = vals.body
    const result = await User.findOne({
      where: {
        email
      }
    })
    if (result) {
      throw new Error('用户已存在')
    }
  }
}

class TokenValidator extends LinValidator {
  constructor () {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {min: 4, max:32})
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '最少6个字符', {min: 6, max:128})
    ]
  }

  validateLoginType (vals) {
    if (!vals.body.type) {
      throw new Error('type是必填参数')
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator
}