const Sequelize = require('sequelize')
const connection = require('./connection')

const Question = connection.define('questions',{
    title:{
        type: Sequelize.STRING,
        allowNUll: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    category:{
        type: Sequelize.STRING,
        allowNUll: false
    }
})

Question.sync({force:false})
    .then(() => {console.log("Question table created")})
    .catch((error) => {console.log(error)})

module.exports = Question
    