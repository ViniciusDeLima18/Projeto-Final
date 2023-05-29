const { json } = require("body-parser");
const db = require("../models");
const Modelo = db.cliente;
const Op = db.Sequelize.Op;
const md5 = require('md5');

const responseModel = {}
function criarResponse() {
    responseModel.success = false
    responseModel.data = null
    responseModel.error = null
}
criarResponse();

function vefPreenchimento(req, res) {
    if (req.body.nome && req.body.email && req.body.senha) {
        req.body.senha = md5(req.body.senha)
        return req.body;
    } else {
        responseModel.error = "Problema com preenchimento";
        req.flash("error_msg", "Problema com o preenchimento.");
        res.redirect("/cliente/add")
    }
}

function vefPreenchimentoEditar(req, res) {
    if (req.body.ativo) {
        req.body.ativo = true;
    }else{
        req.body.ativo = false;
    }
    if (req.body.nome && req.body.login ) {
        return req.body;
    } else {
        responseModel.error = "Problema com preenchimento";
        req.flash("error_msg", "Problema com o preenchimento.");
        res.redirect("/cliente")
    }
}

function list(req, res) {
    criarResponse();
    Modelo.findAll().then(data => {
        if (data.length > 0) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            responseModel.titulo = "Lista de Usuários"
            console.log(responseModel)
            return res.render("admin/cliente/lista", { response: responseModel });
        } else {
            responseModel.error = "Tabela Vazia";
            return res.json(responseModel);
        }

    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });
}

function findById(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("admin/cliente/detalhe", { response: responseModel });
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.");
            res.redirect("/cliente")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.");
        res.redirect("/cliente")

    });
}

function telaRemove(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("admin/cliente/delete", { response: responseModel });
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.");
            res.redirect("/cliente")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.");
        res.redirect("/cliente")

    });
}

function update(req, res) {
    criarResponse();
    modelo = vefPreenchimentoEditar(req, res);
    if (modelo) {
        const id = req.params.id;
        Modelo.findByPk(id).then(data => {
            if (data) {
                Modelo.update(modelo, {
                    where: {
                        id: id
                    }
                }).then(() => {
                    req.flash("success_msg", "Usuáro editado com sucesso");
                    res.redirect("/cliente");
                }).catch(error => {
                    responseModel.error = error;
                    req.flash("error_msg", "Erro ao editar o Usuário");
                    res.redirect("/cliente");
                });
            } else {
                responseModel.error = "Nenhuma informação foi encontada!";
                req.flash("error_msg", "Erro ao editar o Usuário");
                res.redirect("/cliente")
            }

        }).catch(error => {
            responseModel.error = error;
            req.flash("error_msg", "Erro ao editar ");
            res.redirect("/cliente")
        });
    }
}

function remove(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            Modelo.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                responseModel.success = true;
                responseModel.data = "Usuário deletado com sucesso!";
                req.flash("success_msg","Usuário deletado com sucesso!");
                res.redirect("/cliente")
            }).catch(error => {
                responseModel.error = error;
                req.flash("error_msg", "Nenhuma informação foi encontrada.");
                res.redirect("/cliente");
            });
        } else {
            responseModel.error = "Nenhuma informação foi encontada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.");
            res.redirect("/cliente");
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.");
        res.redirect("/cliente");
    });
}

function telaAdd(req, res) {
    criarResponse();
    responseModel.success = true;
    responseModel.titulo = "Cadastro de Usuários"
    res.render("/usuario/novo", { response: responseModel });
}

function add(req, res) {
    criarResponse();
    modelo = vefPreenchimento(req, res);
    if (modelo) {
        Modelo.create(modelo).then(data => {
            responseModel.success = true;
            responseModel.data = data;
            req.flash("success_msg", "Usuário cadastrado com sucesso!");
            res.redirect("/usuario/login")
        }).catch(error => {
            responseModel.error = error;
            req.flash("error_msg", "Ocorreu um erro durante o cadastro!");
            res.redirect("/")
        });
    }
}


function telaEditar(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("admin/cliente/editar", { response: responseModel });
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.");
            res.redirect("/cliente")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.");
        res.redirect("/cliente")

    });
}


module.exports = { list, findById, add, update, remove, telaAdd, telaRemove, telaEditar }