const Sequelize = require('sequelize')
const sequelize = new Sequelize('Doacao', 'root', '********', {
    host: "localhost",
    dialect: 'mysql'
})

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

const usuarios = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
})
usuarios.create({
    nome: "Ebert",
    sobrenome: "Padilha",
    idade: 19,
    email: "ebert@gmail"
})
//usuarios.sync({force:true})