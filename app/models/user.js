const bcrypt = require('bcryptjs')
const { sequelize } = require('./../../core/db')
const {Sequelize, Model} = require('sequelize')
const { NotFound, AuthFaild } = require('./../../core/http-exception')

class User extends Model {
 static async verifyEmailPassword (email, plainPassword) {
  const user = await User.findOne({
    where: {
      email
    }
  })
  if (!user) {
    throw new NotFound('用户未找到')
  }
  const currect = bcrypt.compareSync(plainPassword, user.password)
  if (!currect) {
    throw new AuthFaild('密码错误')
  }
  return user
 }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING,
    unique: true
  },
  email: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set (val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize
})

module.exports = User