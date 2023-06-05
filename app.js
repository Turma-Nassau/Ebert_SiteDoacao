const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const cors = require('cors');

// Importando rotas de admin e usuário
const admin = require("./routes/admin")
const user = require("./routes/user")

// Módulo para gerenciar sessões de usuário
const session = require('express-session')

// Módulo para exibir mensagens de sucesso ou erro para o usuário
const flash = require('connect-flash')

// Módulo para manipular datas
const moment = require("moment")

// Módulo para autenticação de usuário
const passport = require('passport')

// Importando função de autenticação
require("./config/auth")(passport)

// Configurações gerais 

// Configurando sessão
app.use(session({
    secret: "StockRotativo",
    resave: true,
    saveUninitialized: true
}))

// Inicializando módulo de autenticação de usuário
app.use(passport.initialize())

// Gerenciando sessão de usuário
app.use(passport.session())

// Utilizando módulo para exibir mensagens de erro e sucesso
app.use(flash())

// Middleware
app.use((req, res, next) => {
    // Variáveis globais para exibir mensagens de sucesso ou erro
    res.locals.sucesso_msg = req.flash("sucesso_msg")
    res.locals.erro_msg = req.flash("erro_msg");
    res.locals.error = req.flash("error");
    // Variável global para verificar se o usuário é admin ou não
    res.locals.admin = req.admin || null
    res.locals.user = req.user || null;
    next()
})

// Utilizando módulo de gerenciamento de body do request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Configurando o handlebars para as views
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY hh:mm:ss ')
        }
    }
}))
app.set('view engine', 'handlebars')

// Configurando pasta pública para arquivos estáticos
app.use(express.static(__dirname + '/public'))

// Configurar o CORS
app.use(cors());

// Fim das configurações gerais 

// Rotas

app.get('/', (req, res) => {
    res.render('./user/login')
})

// Grupo de rotas para o usuário admin
app.use('/admin', admin)

// Grupo de rotas para o usuário comum
app.use('/user', user)

// Definindo a porta para a aplicação rodar
const PORT = 8083

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} !!`)
})
