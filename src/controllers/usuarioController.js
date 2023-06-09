const { json } = require("body-parser");
const db = require("../models");
const Modelo = db.Usuario;
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
    if (req.body.nome && req.body.login && req.body.senha) {
        req.body.senha = md5(req.body.senha)
        return req.body;
    } else {
        responseModel.error = "Problema com preenchimento";
        req.flash("error_msg", "Problema com o preenchimento.");
        res.redirect("/usuario/add")
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
        res.redirect("/usuario")
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
            return res.render("admin/usuario/lista", { response: responseModel });
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
            res.render("admin/usuario/detalhe", { response: responseModel });
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.");
            res.redirect("/usuario")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.");
        res.redirect("/usuario")

    });
}

function telaRemove(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("admin/usuario/delete", { response: responseModel });
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.");
            res.redirect("/usuario")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.");
        res.redirect("/usuario")

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
                    res.redirect("/usuario");
                }).catch(error => {
                    responseModel.error = error;
                    req.flash("error_msg", "Erro ao editar o Usuário");
                    res.redirect("/usuario");
                });
            } else {
                responseModel.error = "Nenhuma informação foi encontada!";
                req.flash("error_msg", "Erro ao editar o Usuário");
                res.redirect("/usuario")
            }

        }).catch(error => {
            responseModel.error = error;
            req.flash("error_msg", "Erro ao editar ");
            res.redirect("/usuario")
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
                res.redirect("/usuario")
            }).catch(error => {
                responseModel.error = error;
                req.flash("error_msg", "Nenhuma informação foi encontrada.");
                res.redirect("/usuario");
            });
        } else {
            responseModel.error = "Nenhuma informação foi encontada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.");
            res.redirect("/usuario");
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.");
        res.redirect("/usuario");
    });
}

function telaAdd(req, res) {
    criarResponse();
    responseModel.success = true;
    responseModel.titulo = "Cadastro de Usuários"
    res.render("./site/cadastro", { response: responseModel });
}

function add(req, res) {
    criarResponse();
    modelo = vefPreenchimento(req, res);
    if (modelo) {
        Modelo.create(modelo).then(data => {
            responseModel.success = true;
            responseModel.data = data;
            req.flash("success_msg", "Usuário cadastrado com sucesso!");
            res.redirect("/usuario/")
        }).catch(error => {
            responseModel.error = error;
            req.flash("error_msg", "Ocorreu um erro durante o cadastro!");
            res.redirect("/usuario/add")
        });
    }
}


function telaEditar(req, res) {
    criarResponse();
    const id = req.params.id;
    Modulo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("admin/usuario/editar", { response: responseModel });
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.");
            res.redirect("/usuario")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.");
        res.redirect("/usuario")

    });
}

//TELA DE LOGIN 

function telaLogin(req,res){
    criarResponse()
    responseModel.titulo = "Login de Usuários"
    res.render("admin/usuario/login", {response: responseModel})
}

function login(req,res){
    criarResponse()
    Modelo.findAll({
        where:{
            login: req.body.login,
            senha: md5(req.body.senha),
            ativo: true
        }
    }).then(data => {
        if(data.length>0){
            responseModel.success = true
            responseModel.data = JSON.parse(JSON.stringify(data))
            req.session.user = responseModel.data[0]
            res.redirect("/")

        }else{
            responseModel.error ="Login ou senha incorretos!";
            req.flash("error_msg", "Login ou senha incorretos!")
            res.redirect("/usuario/login")
        }

    }).catch(error =>{
        responseModel.error = error;
        req.flash("error_msg", "Login ou senha incorretos!")
        res.redirect("/usuario/login")
    }) 
}

function logout(req,res){
    req.session.destroy()
    res.redirect("/")

}

function telaSenha(req,res){
    criarResponse()
    responseModel.titulo = "Alterar senha"
    responseModel.data = req.session.user
    res.render("admin/usuario/senha", {response: responseModel})
}

function senha(req,res){
    if(!req.body.senhaA && !req.body.senhaN && !req.body.senhaR){
        req.flash("error_msg", "Algum campo não foi preenchido corretamente!")
        res.redirect("/usuario/senha")
    }else{
        modelo = req.session.user
        const senhaA = md5(req.body.senhaA)
        const senhaN = md5(req.body.senhaN)
        const senhaR = md5(req.body.senhaR)

        if (modelo.senha != senhaA) {
            req.flash("error_msg", "A senha atual não está correta!")
            res.redirect("/usuario/senha")

        } else if (senhaN != senhaR) {
            req.flash("error_msg", "A senha não é igual a repetição!")
            res.redirect("/usuario/senha")
        }else{
            modelo.senha = senhaN
            Modelo.update(modelo,{
                where:{
                    id:modelo.id
                }
            }).then(() =>{
                req.flash("success_msg", "Senha alterada com sucesso!")
                res.redirect("/")
            }).catch((error) =>{
                responseModel.error = error
                req.flash("error_msg", "Não foi possivel alterar a senha!")
                res.redirect("/usuario/senha")
            })
        
        }


    }
}


module.exports = { list, findById, add, update, remove, telaAdd, telaRemove, telaEditar, telaLogin, login, logout, telaSenha, senha}