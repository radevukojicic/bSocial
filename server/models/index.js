const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./usersModel')(sequelize, DataTypes)
db.post = require('./postModel')(sequelize, DataTypes)
db.follow = require('./followModel')(sequelize, DataTypes)
db.comments = require('./commentsModel')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('re-sync done!')
})

module.exports = db