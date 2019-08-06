const Sequelize = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = reuqire('./../config/config.js').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  timezone: '+08:00',
  define: {

  }
})

module.exports = {
  sequelize
}