const express = require("express")
const router = express.Router()

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

module.exports = router