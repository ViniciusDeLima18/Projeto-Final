module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		nome: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        cpf: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        datanascimento: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        email: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		},
		telefone: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		},
		senha: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
            defaultValue:true,
		}
	});
	return Usuario;
};
