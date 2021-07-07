const Sequelize = require('sequelize')

// Connection Object
const connection = new Sequelize('global_db', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    define:{
        freezeTableName: true,
        timestamps: true
    }
})

// Test Connection
connection
    .authenticate()
    .then(() => console.log("Database connection, its on!"))
    .catch((error) => console.log(error))


module.exports = connection