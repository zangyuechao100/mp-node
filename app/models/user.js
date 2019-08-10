const bcrypt = require('bcryptjs')
const { sequelize } = require('./../../core/db')
const {Sequelize, Model} = require('sequelize')

class User extends Model {
 static async verifyEmailPassword (email, plainPassword) {
  const user = User.findOne({})
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