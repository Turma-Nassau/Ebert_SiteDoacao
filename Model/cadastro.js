const bd = require('./bd')

const usuario = bd.sequileze.define('usuarios', {


    nome: {
        type: bd.Sequelize.STRING(20)
    },

    sobrenome: {
        type: bd.Sequelize.STRING(20)
    },

    email: {
        type: bd.Sequelize.STRING(50)
    },

    idade: {
        type: bd.Sequelize.NUMERIC(2)
    },

    senha: {
        type: bd.Sequelize.STRING(30)
    }

})

module.exports = usuario;