module.exports = (sequelize, Sequelize) => {
	const Destino = sequelize.define('destino', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		titulo: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        fotoDestaque: {
			type: Sequelize.STRING,
		},
        fotoLista: {
			type: Sequelize.STRING,
		},
        fotoBanner: {
			type: Sequelize.STRING,
		},
        descricaoDestaque: {
			type: Sequelize.STRING,
		},
        descricao: {
			type: Sequelize.STRING,
		},
        periodo: {
			type: Sequelize.STRING,
		},
		hotel: {
			type: Sequelize.STRING,
		},
        transporte: {
			type: Sequelize.STRING,
		},
        destino: {
			type: Sequelize.STRING,
		},
        pais: {
			type: Sequelize.STRING,
		},
        valor: {
			type: Sequelize.DECIMAL,
		},
        reviews: {
			type: Sequelize.INTEGER,
            defaultValue:0,
		}
	});
	return Destino;
};



