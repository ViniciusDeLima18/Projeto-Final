const Sequelize = require("sequelize");
require("dotenv").config();

const database = process.env.DB
const user = process.env.DBUSER
const pass = process.env.DBPASS
const host = process.env.DBHOST
const dialect = process.env.DBDIALECT

const sequelize = new Sequelize(database, user, pass, {
  host: host,
  dialect: dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require("./Usuario")(sequelize, Sequelize);
db.Destino = require("./Destino")(sequelize, Sequelize);
db.Cliente = require("./Cliente")(sequelize, Sequelize);

module.exports = db;