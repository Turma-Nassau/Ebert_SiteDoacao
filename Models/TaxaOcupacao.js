const MySql = require('./MySql')

const Ocupacao = MySql.sequelize.define('Ocupacao', {

    id: {
        type: MySql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    espaco_total: {
        type: MySql.Sequelize.FLOAT, 
        allowNull: false
        // procurar informações para sempre deixar um default
    },
    espaco_utilizado: {
        type: MySql.Sequelize.FLOAT,
        allowNull: false
    },
    data_atualizacao: {
        type: MySql.Sequelize.DATE,
        allowNull: false
    }
    
} , { freezeTableName: true });

module.exports = Ocupacao;


//Ocupacao.sync({Force: true}) 