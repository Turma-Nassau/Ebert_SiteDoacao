const Sequelize = require('sequelize')

const sequelize = new Sequelize('Doacao', 'root', 'EbertJ14', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

