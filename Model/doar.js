const bd = require('./bd')

    const doar = bd.sequelize.define('doar', {

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
            type: bd.Sequelize.STRING
        },

})
module.exports = doar;
doar.sync({Force: true})

