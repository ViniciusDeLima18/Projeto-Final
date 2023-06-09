var express = require('express');
var router = express.Router();
var controler = require("../controllers/usuarioController")

const util = require("../utilidades/util")

router.get('/',util.vef, controler.list);

router.get('/add',util.vef,controler.telaAdd);
router.post('/add',util.vef, controler.add);

router.get('/list',util.vef,controler.list);
router.get('/find/:id',util.vef, controler.findById);
router.get('/update/:id',util.vef, controler.telaEditar);
router.post('/update/:id',util.vef, controler.update);
router.get('/remove/:id',util.vef, controler.telaRemove);
router.post('/remove/:id',util.vef, controler.remove);

router.get("/login", controler.telaLogin)
router.post("/login", controler.login)
router.get("/logout", controler.logout)

router.get("/senha", util.vef, controler.telaSenha)
router.post("/senha", util.vef, controler.senha)


module.exports = router;