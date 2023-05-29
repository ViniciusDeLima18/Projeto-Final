const { json } = require("body-parser");
const db = require("../models");
const Modelo = db.Destino;
const Op = db.Sequelize.Op;
const md5 = require('md5');

const responseModel = {}
function criarResponse() {
    responseModel.success = false
    responseModel.data = null
    responseModel.error = null
}
criarResponse();

function add(req, res) {
    criarResponse();
    modelo = {
        titulo: "PACOTE PARA JOÃO PESSOA",
        fotoDestaque: "/img/pacotes/TambauJoaopessoa.jpg",
        fotoLista: "/img/populares/LencoisMaranhenses.jpg",
        fotoBanner: "",
        descricaoDestaque: "Com direito a hospedagem, café da manhã, voo de ida e volta. As pessoas ficarão em quartos duplos ou triplos.",
        descricao: "Com direito a hospedagem, café da manhã, voo de ida e volta. As pessoas ficarão em quartos duplos ou triplos.",
        periodo: "6D/5N",
        destino: "João Pessoa",
        pais: "Brasil",
        valor: "389.99",
        reviews: 25
    }
    if (modelo) {
        Modelo.create(modelo).then(data => {
            responseModel.success = true;
            responseModel.data = data;
            res.json(responseModel)
        }).catch(error => {
            responseModel.error = error;
            res.json(responseModel)
        });        
    }else{
        res.send("sem modelo")
    }
}












module.exports = {add}