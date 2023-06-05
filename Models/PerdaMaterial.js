const MySql = require("./MySql")

const Perda = MySql.sequelize.define('Perda', {

    id: {
        type: MySql.Sequelize.INTEGER,
        primaryKey: true
    },
    produto: {
        type: MySql.Sequelize.STRING,
        allowNull: false
    },
    quantidade_total: {
        type: MySql.Sequelize.INTEGER,
        allowNull: false
    },
    quantidade_perdida: {
        type: MySql.Sequelize.INTEGER,
        allowNull: false
    },
    data_atualizacao: {
        type: MySql.Sequelize.DATE,
        allowNull: false
    }

} , { freezeTableName: true });

module.exports = Perda;


//Perda.sync({Force: true}) 