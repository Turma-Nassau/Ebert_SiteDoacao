// Módulos
    const express = require("express")
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    swaggerFile = require("./swagger_document.json"),
    swaggerUi = require("swagger-ui-express");
// Config.

    //BodyParser
        app.use(bodyParser.urlencoded({extend: true}))
        app.use(bodyParser.json())

    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');
        
    //Swagger
        swaggerFile = require("./swagger_document.json"),
        swaggerUi = require("swagger-ui-express")

//Documentação
    app.use('/',swaggerUi.serve, swaggerUi.setup(swaggerFile))

    //Rotas
    app.get('/',(req, res) => {
        res.send("Página principal")
    })

    app.get('/doar',(req, res) => {
    res.send("Página para doações")
    })

    app.get('/login',(req, res) => {
    res.send("Página de login")
    })

//Outros
const PORT = 8000
app.listen(PORT, () => {
    console.log('Servidor Rodando!')
})