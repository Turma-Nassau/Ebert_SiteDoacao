// Módulos
const express = require("express")
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
swaggerFile = require("./swagger_document.json"),
    swaggerUi = require("swagger-ui-express");

// Importando rotas de usuário

    const user = require("./routes/user")


// Config.

//BodyParser
    app.use(bodyParser.urlencoded({ extend: true }))
    app.use(bodyParser.json())

//Handlebars
    app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
    app.set('view engine', 'handlebars');

//Swagger
    swaggerFile = require("./swagger_document.json"),
    swaggerUi = require("swagger-ui-express")

//Documentação
    app.use('/documento', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Rotas Usuário 
// Página píncipal 

    app.use('/admin', admin)

// Grupo de rotas para o usuário comum
    app.use('/user', user)

//Outros
    const PORT = 8000
    app.listen(PORT, () => {
        console.log('Servidor Rodando!')
})
