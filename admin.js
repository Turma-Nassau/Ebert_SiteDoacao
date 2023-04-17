const express = require("express")
const router = express.Router()

router.get('/',(req, res) => {
     res.send("Página principal")
})

router.get('/doar',(req, res) => {
    res.send("Página para doações")
})

router.get('/login',(req, res) => {
    res.send("Página de login")
})

module.exports = router