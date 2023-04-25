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

//Rotas Usuário 
        // Página píncipal 
            router.get('/',(req, res) => {
                res.send("Página principal")
            })

            // Página para ver as postagens de doação
            router.get('/doar',(req, res) => {
            res.send("Página para doações")
            })

            // Página para criar uma conta
            router.get('/login',(req, res) => {
            res.render("user/login")
            })

            // Página para criar uma nova postagem 
            router.get('doar/form', (req, res) => {
            res.render("user/doarform")
            })
            
//Rotas Admin
    //Página principal para um administrador
        router.get('/admin',(req, res) => {
            res.send("Página principal")
        })

        //Página de doação para um administrador
        router.get('/doarAdmin',(req, res) => {
        res.send("Página para doações")
        })

        //Página de login para um administrador
        router.get('/loginAdmin',(req, res) => {
        res.send("Página de login")
        })
        
//Outros
const PORT = 8000
app.listen(PORT, () => {
    console.log('Servidor Rodando!')
})