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
  },
  wx: {
    appId: 'wxa8be9183de4ae5ca',
    appSecret: '',
    loginUrl: `https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code`
  }
}