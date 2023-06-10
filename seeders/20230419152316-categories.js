'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'categorias',
			[
				{
					descricao: 'Informática'
				},
				{
					descricao: 'Celulares'
				},
				{
					descricao: 'Beleza e Perfumaria'
				},
				{
					descricao: 'Mercado'
				},
				{
					descricao: 'Livros e Papelaria'
				},
				{
					descricao: 'Brinquedos'
				},
				{
					descricao: 'Moda'
				},
				{
					descricao: 'Bebê'
				},
				{
					descricao: 'Games'
				}
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('categorias', null, {});
	}
};
