const express = require("express")
const router = express.Router()

router.get('/adimn',(req, res) => {
     res.send("Página principal")
})

router.get('/doarAdmin',(req, res) => {
    res.send("Página para doações")
})

router.get('/loginAdmin',(req, res) => {
    res.send("Página de login")
})

module.exports = router