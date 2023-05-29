var express = require('express');
var router = express.Router();
var controler = require("../controllers/suporteController")
var destino = require("../controllers/destinoController")

router.get('/destinos', destino.list);

router.get('/cadastro', (req,res) =>{
    res.render("site/cadastro")
});

router.get('/confirmar', (req,res) =>{
    res.render("site/confirmar")
});

router.get('/cadastrarpacote', (req,res) =>{
    res.render("site/cadastrarpacote")
});

router.post('/cadastrarpacote', destino.add);



router.get('/add', controler.add);
  
module.exports = router;