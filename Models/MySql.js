const Sequelize = require('sequelize')

// conexão com banco de dados MySql

const sequelize = new Sequelize('usinacoruripe', 'root', '', {
  host: "localhost",   //onde vamos rodar o servidor
  dialect: 'mysql',     // banco de dados utilizado
  query: { raw: true }
})

// Fim conexão

// exportando o sequelize 

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}