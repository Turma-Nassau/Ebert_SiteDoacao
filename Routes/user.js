const express = require("express")
const router = express.Router()

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
    res.render("./usario/login")
})

// Página para criar uma nova postagem 
router.get('/doar/form', (req, res) => {
    res.render("./usuario/doar")
})
module.exports = router