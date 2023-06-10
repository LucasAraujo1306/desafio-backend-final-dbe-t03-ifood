'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('produtos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			descricao: {
				type: Sequelize.STRING,
				allowNull: false
			},
			quantidade_estoque: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			valor: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			categoria_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'categorias',
					key: 'id'
				}
			}
		});

		await queryInterface.addConstraint('produtos', {
			type: 'foreign key',
			fields: ['categoria_id'],
			name: 'fk_produtos_categorias',
			references: {
				table: 'categorias',
				field: 'id'
			}
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('produtos');
	}
};
