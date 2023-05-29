const { json } = require("body-parser");
const db = require("../models");
const Modelo = db.Destino;
const Op = db.Sequelize.Op;

const qtdaListaPrincipal = 3
const qtdaListaSecundaria = 9 

function vefPreenchimento(req, res) {
    if (req.body.titulo && req.body.destino && req.body.pais  && req.body.valor) {
        return req.body;
    } else {
        responseModel.error = "Problema com preenchimento";
        req.flash("error_msg", "Problema com o preenchimento.");
        res.json(responseModel.error)
    }
}

const responseModel = {}
function criarResponse() {
    responseModel.success = false
    responseModel.data = null
    responseModel.error = null
}
criarResponse();

function list(req, res) {
    criarResponse();
    Modelo.findAll({
        order: [
            ['reviews', 'DESC']
        ]
    }).then(data => {
        if (data.length > 0) {
            responseModel.success = true;

            lista = JSON.parse(JSON.stringify(data));
            listaPrincipal = lista.slice(0, qtdaListaPrincipal)

            const temp = lista.filter( x => { 
                return JSON.stringify(listaPrincipal).indexOf(JSON.stringify(x)) < 0;
              });
            listaSecundaria = temp.slice(0, qtdaListaSecundaria)

            responseModel.data = listaPrincipal;
            responseModel.secundario = listaSecundaria;
            return res.render("site/destinos", { response: responseModel });
        } else {
            responseModel.error = "Tabela Vazia";
            return res.json(responseModel);
        }

    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });
}

function add(req, res) {
    
    criarResponse();
    modelo = vefPreenchimento(req, res);
    if (modelo) {
        Modelo.create(modelo).then(data => {
            responseModel.success = true;
            responseModel.data = data;
            req.flash("success_msg", "Destino cadastrado com sucesso!");
            res.redirect("/site/destinos")
        }).catch(error => {
            console.log(error)
            responseModel.error = error;
            req.flash("error_msg", "Ocorreu um erro durante o cadastro!");
            res.redirect("/site/destinos")
        });
    }
}

module.exports = {list,add}