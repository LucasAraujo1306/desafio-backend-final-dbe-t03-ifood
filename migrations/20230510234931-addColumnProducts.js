'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('produtos', 'produto_imagem', {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('produtos', 'produto_imagem');
	}
};
