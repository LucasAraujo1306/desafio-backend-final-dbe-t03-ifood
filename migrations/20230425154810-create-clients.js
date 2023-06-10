'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('clientes', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true
			},
			cpf: {
				type: Sequelize.STRING(11),
				allowNull: false,
				unique: true
			},
			cep: {
				type: Sequelize.STRING(8)
			},
			rua: {
				type: Sequelize.STRING(255)
			},
			numero: {
				type: Sequelize.STRING(10)
			},
			bairro: {
				type: Sequelize.STRING(255)
			},
			cidade: {
				type: Sequelize.STRING(255)
			},
			estado: {
				type: Sequelize.STRING(2)
			}
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('clientes');
	}
};
