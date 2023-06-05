const express = require('express')

require('./admin')
require('./user')

require('../models/ProdutoEstoque')
require('../models/PerdaMaterial')
require('../models/TaxaOcupacao')
require('../models/TempoEntrega')

require('../models/Usuario')
require('../models/MySql')


const produtoEstoque = require('../models/ProdutoEstoque')
const perdaMaterial = require('../models/PerdaMaterial')
const Espaco = require('../models/TaxaOcupacao')
const tempoEntrega = require('../models/TempoEntrega')
const Usuario = require('../models/Usuario')

const bcrypt = require("bcryptjs")
const passport = require("passport")
const router = express.Router()

const { eUsuario } = require('../helpers/eUsuario')



// Lembrar de adicionar uma autenticação nessas partes, para que só funcionários possam entrar na rede 


// rota para acessar a página
router.get('/', (req, res) => {
    res.render("./user/login")
})

// rota para criar um novo usuário 
router.get('/criarUsuario', (req, res) => {
    res.render("./user/criarUsuario")
})

//rota principal da página
router.get('/principal', eUsuario, (req, res) => {
    res.render("./user/principal")  // ajustar
})

// rota com todos os serviços possíveis 
router.get('/lista', eUsuario, (req, res) => {
    res.render("./user/listaServicos") // ajustar
})

// rota para registar um novo tempo de entrega
router.get('/tempoEntrega', (req, res) => {
    res.render("./user/tempoEntrega") //ok
})

// rota para registrar a taxa de ocupaçõa do setor
router.get('/taxaOcupacao', eUsuario, (req, res) => {
    res.render("./user/taxaOcupacao") // ok
})

// rota para registrar os produtos em estoque 
router.get('/produtoEstoque', eUsuario, (req, res) => {
    res.render("./user/produtoEstoque") // ok
})

// rota para registrar um material perdido 
router.get('/PerdaMaterial', eUsuario, (req, res) => {
    res.render("./user/perdaMaterial") // ok
})




// colocar informações importantes do aplicativo e da empresa já que é uma das únicas abas que o usuário terá acesso sem que seja preciso fazer login

// rota informativa com as inteções do projeto StockRotativo
router.get('/empresa', (req, res) => {
    res.render('./user/empresa')
})




// rotas POST que vão receber os meus arquivos

router.post('/tempoEntrega/novo', (req, res) => {
    // validação dos formulários
    var erros_tempoEntrega = []

    // falta o if do id

    if (!req.body.produto || typeof req.body.produto == undefined || req.body.produto == null || req.body.produto.length == 0) {
        erros_tempoEntrega.push({ texto: " O nome do produto é muito pequeno" })
    }

    if (!req.body.data_saida || typeof req.body.data_saida == undefined || req.body.data_saida == null) {
        erros_tempoEntrega.push({ texto: " A data informada não pode ser utilizada" })
    }

    if (!req.body.data_entrega || typeof req.body.data_entrega == undefined || req.body.data_entrega == null) {
        erros_tempoEntrega.push({ texto: " A data informada não pode ser utilizada" })
    }

    if (erros_tempoEntrega.length > 0) {
        res.render("./user/tempoEntrega", { erros_tempoEntrega: erros_tempoEntrega })
    } else {
        // Adicionar o tempo de entrega
        const novoTempoEntrega = {
            codigo: req.body.codigo,
            produto: req.body.produto,
            data_saida: req.body.data_saida,
            data_entrega: req.body.data_entrega
        }

        new tempoEntrega(novoTempoEntrega).save().then(() => {
            req.flash("sucesso_msg", "Tempo de entrega salvo com sucesso !!")

            // Define o cabeçalho "Content-Type" como "application/json"
            res.setHeader('Content-Type', 'application/json');

            // Envia a resposta como JSON
            res.json({ status: 'success', message: 'Tempo de entrega adicionado com sucesso!' });
        }).catch((err) => {
            req.flash("erro_msg", "Houve um erro ao criar o tempo de entrega, tente novamente mais tarde !")
            res.redirect("/user/tempoEntrega")
        })
    }
})


router.post('/taxaOcupacao/novo',  (req, res) => {
    // Validação da taxa de ocupação
    var erros_taxaOcupacao = [];

    if (!req.body.espaco_total || typeof req.body.espaco_total == undefined || req.body.espaco_total == null) {
        erros_taxaOcupacao.push({ texto: "O espaço total digitado é inválido" });
    }

    if (!req.body.espaco_utilizado || typeof req.body.espaco_utilizado == undefined || req.body.espaco_utilizado == null) {
        erros_taxaOcupacao.push({ texto: "O espaço utilizado digitado é inválido" });
    }

    if (!req.body.data_atualizacao || typeof req.body.data_atualizacao == undefined || req.body.data_atualizacao == null) {
        erros_taxaOcupacao.push({ texto: "A data informada é inválida" });
    }

    if (erros_taxaOcupacao.length > 0) {
        res.render("./user/taxaOcupacao", { erros_taxaOcupacao: erros_taxaOcupacao });
    } else {
        // Adicionando uma taxa de ocupação
        const novaTaxaOcupacao = {
            espaco_total: req.body.espaco_total,
            espaco_utilizado: req.body.espaco_utilizado,
            data_atualizacao: req.body.data_atualizacao
        };

        new Espaco(novaTaxaOcupacao)
            .save()
            .then(() => {
                req.flash("sucesso_msg", "Taxa de ocupação criada com sucesso !!");

                // Define o cabeçalho "Content-Type" como "application/json"
                res.setHeader('Content-Type', 'application/json');

                // Envia a resposta como JSON
                res.json({ status: 'success', message: 'Taxa de ocupação criada com sucesso !!' });
            })
            .catch((err) => {
                req.flash("erro_msg", "Houve um erro ao criar a taxa de ocupação, tente novamente mais tarde !");
                res.redirect("/user/taxaOcupacao");
            });
    }
});


router.post('/produtoEstoque/novo', (req, res) => {
    // Validação da taxa de ocupação
    var erros_produtoEstoque = [];
  
    if (!req.body.id || typeof req.body.id === undefined || req.body.id === null) {
      erros_produtoEstoque.push({ texto: "O código digitado é inválido" });
    }
  
    if (!req.body.quantidade || typeof req.body.quantidade === undefined || req.body.quantidade === null) {
      erros_produtoEstoque.push({ texto: "A quantidade digitada é inválida" });
    }
  
    if (!req.body.produto || typeof req.body.produto === undefined || req.body.produto === null) {
      erros_produtoEstoque.push({ texto: "A descrição digitada é inválida" });
    }
  
    if (!req.body.data_atualizacao || typeof req.body.data_atualizacao === undefined || req.body.data_atualizacao === null) {
      erros_produtoEstoque.push({ texto: "A data informada é inválida" });
    }
  
    if (erros_produtoEstoque.length > 0) {
      res.status(400).json({ status: 'error', message: 'Erro de validação', errors: erros_produtoEstoque });
    } else {
      // Adicionando novo produto no estoque
      const novoProdutoEstoque = {
        id: req.body.codigo,
        quantidade: req.body.quantidade,
        produto: req.body.produto,
        data_atualizacao: req.body.dataEntrada
      };
  
      new produtoEstoque(novoProdutoEstoque).save()
        .then(() => {
          // Define o cabeçalho "Content-Type" como "application/json"
          res.setHeader('Content-Type', 'application/json');
  
          // Envia a resposta como JSON
          res.json({ status: 'success', message: 'Produto adicionado ao estoque com sucesso !!' });
        })
        .catch((err) => {
          res.status(500).json({ status: 'error', message: 'Houve um erro ao criar a taxa de ocupação, tente novamente mais tarde !' });
        });
    }
  });
  
  

  router.post('/perdaMaterial/novo', (req, res) => {
    // Validação da perda de material
    var erros_perdaMaterial = [];

    if (!req.body.id || typeof req.body.id === undefined || req.body.id === null || req.body.id.length !== 7) {
        erros_perdaMaterial.push({ texto: "O código digitado é inválido" });
    }

    if (!req.body.quantidade_total || typeof req.body.quantidade_total === undefined || req.body.quantidade_total === null) {
        erros_perdaMaterial.push({ texto: "A quantidade digitada é inválida" });
    }

    if (!req.body.quantidade_perdida || typeof req.body.quantidade_perdida === undefined || req.body.quantidade_perdida === null) {
        erros_perdaMaterial.push({ texto: "A quantidade digitada é muito pequena ou inválida" });
    }

    if (!req.body.produto || typeof req.body.produto === undefined || req.body.produto === null) {
        erros_perdaMaterial.push({ texto: "O produto digitado é inválido" });
    }

    if (!req.body.data_atualizacao || typeof req.body.data_atualizacao === undefined || req.body.data_atualizacao === null) {
        erros_perdaMaterial.push({ texto: "A data informada é inválida" });
    }

    if (erros_perdaMaterial.length > 0) {
        res.status(400).json({ erros_perdaMaterial });
    } else {
        // Adicionando novo produto no estoque
        const novaperdaMaterial = {
            id: req.body.id,
            quantidade_total: req.body.quantidade_total,
            quantidade_perdida: req.body.quantidade_perdida,
            produto: req.body.produto,
            data_atualizacao: req.body.data_atualizacao
        };

        new perdaMaterial(novaperdaMaterial)
            .save()
            .then(() => {
                req.flash("sucesso_msg", "Um novo produto perdido foi adicionado!!");
                res.json({ status: 'success', message: 'Um novo produto perdido foi adicionado!!' });
            })
            .catch((err) => {
                req.flash("erro_msg", "Houve um erro ao criar a taxa de ocupação, tente novamente mais tarde !");
                res.status(500).json({ error: 'Erro interno do servidor' });
            });
    }
});


// POST para validar a criação do usuário
router.post('/criar/novo', (req, res) => {
    var erros_usuario = [];
  
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
      erros_usuario.push({ texto: "Nome inválido" });
    }
  
    if (!req.body.sobrenome || typeof req.body.sobrenome == undefined || req.body.sobrenome == null) {
      erros_usuario.push({ texto: "Sobrenome inválido" });
    }
  
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
      erros_usuario.push({ texto: "E-mail inválido" });
    }
  
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
      erros_usuario.push({ texto: "Senha inválida" });
    }
  
    if (req.body.senha.length < 4) {
      erros_usuario.push({ texto: "Senha muito curta" });
    }
  
    if (req.body.senha != req.body.senha2) {
      erros_usuario.push({ texto: "As senhas são diferentes, verifique os campos e tente novamente" });
    }
  
    if (erros_usuario.length > 0) {
      // Retorna a resposta como JSON com os erros
      res.status(400).json({ status: 'error', message: 'Erro na validação dos campos', errors: erros_usuario });
    } else {
      // Substitua o email pela matrícula da usina
      Usuario.findAll({ where: { email: req.body.email } }).then((usuario) => {
        if (usuario.length > 0) {
          // Retorna a resposta como JSON com a mensagem de erro
          res.status(400).json({ status: 'error', message: 'Já existe uma conta com este e-mail no nosso sistema' });
        } else {
          var hash = bcrypt.hashSync(req.body.senha, bcrypt.genSaltSync(12));
          const novoUsuario = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            matricula: req.body.matricula,
            senha: hash
          };
  
          Usuario.create(novoUsuario)
            .then(() => {
              // Retorna a resposta como JSON com a mensagem de sucesso
              res.json({ status: 'success', message: 'Usuário cadastrado com sucesso!' });
            })
            .catch((err) => {
              console.log(err);
              // Retorna a resposta como JSON com a mensagem de erro
              res.status(500).json({ status: 'error', message: 'Erro ao cadastrar o usuário' });
            });
        }
      });
    }
  });
  




// Rota post para fazer login e acessar a página
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/user/principal",
        failureRedirect: "/",
        failureFlash: true,
        badRequestMessage: 'Informe o e-mail e senha'
    })(req, res, next)
})

  

// Rota post para fazer deslogar o usuário
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        req.flash("sucesso_msg", "Deslogado com sucesso!!")
        res.redirect('/')
    })
})


module.exports = router