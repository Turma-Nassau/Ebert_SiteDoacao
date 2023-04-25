const bd = require('./bd')

    const usuario = bd.sequelize.define('usuario', {

        nome: {
            type: bd.Sequelize.STRING(30)
        },
    
        sobrenome: {
            type: bd.Sequelize.STRING(30)
        },
    
        email: {
            type: bd.Sequelize.STRING(50),
            unique: true
        },
            
        senha: {
            type: bd.Sequelize.STRING(225)
        }
    
    }, { freezeTableName: true });
module.exports = usuario;
usuario.sync({Force: true})