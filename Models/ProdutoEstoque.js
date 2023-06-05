const MySql = require('./MySql')

const Estoque = MySql.sequelize.define('Estoque', {
    id: {
        type: MySql.Sequelize.INTEGER,
        primaryKey: true
    },
    produto: {
        type: MySql.Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: MySql.Sequelize.INTEGER,
        allowNull: false
    },
    data_atualizacao: {
        type: MySql.Sequelize.DATE,
        allowNull: false
    }
}, { freezeTableName: true });

module.exports = Estoque;


//Estoque.sync({force: true})   

