const doar = require('./bd')

const doar = bd.sequileze.define('doar', {

    nome: {
        type: bd.Sequelize.STRING
    },

    situacao: {
        type: bd.Sequelize.STRING
    },

    necessidade: {
        type: bd.Sequelize.STRING
    },

    localidade: {
        type: bd.Sequelize.STRING
    },

    informacoes: {
        type: bd.Sequelize.NUMERIC
    },

})

module.exports = doar;
