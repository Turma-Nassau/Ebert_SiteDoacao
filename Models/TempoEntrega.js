const MySql = require('./MySql')
const moment = require('moment');

const TempoEntrega = MySql.sequelize.define('TempoEntrega', {
  id: {
    type: MySql.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo: {
    type: MySql.Sequelize.INTEGER,
    unique: true
  }, // lembrar de atualizar isso 
  produto: {
    type: MySql.Sequelize.STRING,
    allowNull: false
  },
  data_saida: {
    type: MySql.Sequelize.DATE,
    allowNull: false
  },
  data_entrega: {
    type: MySql.Sequelize.DATE, // em minutos ou horas
    allowNull: false,
  }
}, { freezeTableName: true });

module.exports = TempoEntrega;


//TempoEntrega.sync({ force: true })


