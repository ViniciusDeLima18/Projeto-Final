var express = require('express');
var router = express.Router();
var controler = require("../controllers/clienteController")

router.get('/',controler.list);

router.get('/add',controler.telaAdd);
router.post('/add', controler.add);

router.get('/list',controler.list);
router.get('/find/:id', controler.findById);
router.get('/update/:id', controler.telaEditar);
router.post('/update/:id', controler.update);
router.get('/remove/:id', controler.telaRemove);
router.post('/remove/:id', controler.remove);
  
module.exports = router;