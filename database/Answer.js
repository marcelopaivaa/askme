const Sequelize = require('sequelize')
const connection = require('./connection')

const Answer = connection.define("answer", {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({force:false})
    .then(() => {console.log("Answer table created")})
    .catch((error) => {console.log(error)})

module.exports = Answer

