module.exports = {
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'zangyuechao100'
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60*60*24*3600
  }
}