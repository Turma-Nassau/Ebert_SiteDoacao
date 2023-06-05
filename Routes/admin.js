const express = require('express')
const router = express.Router()

require('./user')


const PerdaProduto = require('../models/PerdaMaterial')
const ProdutoEstoque = require('../models/ProdutoEstoque')
const TaxaOcupacao = require('../models/TaxaOcupacao')
const TempoEntrega = require('../models/TempoEntrega')
const Usuario = require("../models/Usuario")



require('../models/ProdutoEstoque')
require('../models/PerdaMaterial')
require('../models/TaxaOcupacao')
require('../models/TempoEntrega')

require('../models/Usuario')
require('../models/MySql')


// Helper para verificar se o usuário é admin ou não
const { eAdmin } = require('../helpers/eAdmin')

//rotas do adminitrador 

// rota principal
router.get('/', eAdmin, (req, res) => {
    res.render("./admin/index")

})


// rota com a listagem de todos os tempos de entrega 
router.get('/listaTempoEntrega', (req, res) => {
    TempoEntrega.findAll({ order: [['codigo', 'desc']] })
      .then((tempoEntrega) => {
        res.json(tempoEntrega);
      })
      .catch((err) => {
        req.flash("erro_msg ", "Houve um erro ao listar todos os tempos de entrega, tente novamente mais tarde!");
        res.status(500).json({ error: 'Erro ao obter tempos de entrega' });
      });
  });

// rota com a listagem de todas as taxas de ocupação 
router.get('/listaTaxaOcupacao', eAdmin, (req, res) => {
    TaxaOcupacao.findAll({ order: [['id', 'desc']] }).then((taxaOcupacao) => {
        res.render("./admin/listaTaxaOcupacao", { taxaOcupacao: taxaOcupacao })

    }).catch((err) => {
        req.flash("erro_msg ", "Houve um erro ao listar todas as taxas de ocupação, tente novamente mais tarde!")
        res.redirect('/admin')
    })

})

// rota com a listagem de todos os produtos do estoque
router.get('/listaProdutoEstoque', eAdmin, (req, res) => {
    ProdutoEstoque.findAll({ order: [['id', 'desc']] }).then((produtoEstoque) => {
        res.render("./admin/listaProdutoEstoque", { produtoEstoque: produtoEstoque })

    }).catch((err) => {
        req.flash("erro_msg ", "Houve um erro ao listar todos os produtos do estoque, tente novamente mais tarde!")
        res.redirect('/admin')
    })

})

// rota com a listagem de todos os produtos perdidos 
router.get('/listaPerdaMaterial', eAdmin, (req, res) => {
    PerdaProduto.findAll({ order: [['id', 'desc']] }).then((perdaProduto) => {
        res.render("./admin/listaPerdaMaterial", { perdaProduto: perdaProduto })

    }).catch((err) => {
        req.flash("erro_msg ", "Houve um erro ao listar todos os matérias perdidos, tente novamente mais tarde!")
        res.redirect('/admin')
    })

})

// rota com a listagem de todos os produtos perdidos 
router.get('/listaUsuario', eAdmin, (req, res) => {
    Usuario.findAll({ order: [['id', 'desc']] }).then((usuario) => {
        res.render("./admin/listaUsuario", { usuario: usuario })

    }).catch((err) => {
        req.flash("erro_msg ", "Houve um erro ao listar todos os usuários, tente novamente mais tarde!")
        res.redirect('/admin')
    })

})



// Rotas para apagar dados do MySql

// Rota post para apagar um tempo de entrega
router.post('/listaTempoEntrega/deletar', (req, res) => {
    TempoEntrega.destroy({ where: { 'id': req.body.id } }).then(() => {
        req.flash("sucesso_msg", "Tempo de entrega deletado com sucesso !")
        res.redirect('/admin/listaTempoEntrega')
    }).catch((err) => {
        req.flash("erro_msg", "Houve um erro ao deletar o tempo de entrega" + err)
    })
})

// Rota post para apagar uma taxa de ocupação
router.post('/listaTaxaOcupacao/deletar',eAdmin, (req, res) => {
    TaxaOcupacao.destroy({ where: { 'id': req.body.id } }).then(() => {
        req.flash("sucesso_msg", "Taxa de ocupação deletada com sucesso !")
        res.redirect('/admin/listaTaxaOcupacao')
    }).catch((err) => {
        req.flash("erro_msg", "Houve um erro ao deletar a taxa de ocupação" + err)
    })
})

// Rota post para apagar um produto do estoque
router.post('/listaProdutoEstoque/deletar',eAdmin, (req, res) => {
    ProdutoEstoque.destroy({ where: { 'id': req.body.id } }).then(() => {
        req.flash("sucesso_msg", "Material deletado com sucesso !")
        res.redirect('/admin/listaProdutoEstoque')
    }).catch((err) => {
        req.flash("erro_msg", "Houve um erro ao deletar o material" + err)
    })
})

// Rota post para apagar um material perdido
router.post('/listaPerdaMaterial/deletar',eAdmin, (req, res) => {
    PerdaProduto.destroy({ where: { 'id': req.body.id } }).then(() => {
        req.flash("sucesso_msg", "Material perdido deletado com sucesso !")
        res.redirect('/admin/listaPerdaMaterial')
    }).catch((err) => {
        req.flash("erro_msg", "Houve um erro ao deletar o material perdido" + err)
    })
})


// Rotas para editar 

router.get("/listaTempoEntrega/editar/:id", (req, res) => {
    const id = req.params.id;
  
    TempoEntrega.findByPk(id)
      .then((tempoEntrega) => {
        if (tempoEntrega) {
          res.json(tempoEntrega);
        } else {
          req.flash("erro_msg", "Esse tempo de entrega não existe");
          res.redirect("/admin");
        }
      })
      .catch((err) => {
        req.flash("erro_msg", "Houve um erro ao buscar o tempo de entrega");
        res.redirect("/admin");
      });
  });
  







module.exports = router