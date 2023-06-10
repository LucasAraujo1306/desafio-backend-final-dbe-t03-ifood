'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('pedidos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			cliente_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'clientes',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			observacao: {
				type: Sequelize.STRING,
				allowNull: true
			},
			valor_total: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		});

		await queryInterface.addConstraint('pedidos', {
			type: 'foreign key',
			name: 'fk_pedidos_cliente_id',
			fields: ['cliente_id'],
			references: {
				table: 'clientes',
				field: 'id'
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		});
	},
	async down(queryInterface) {
		await queryInterface.removeConstraint('pedidos', 'fk_pedidos_cliente_id');
		await queryInterface.dropTable('pedidos');
	}
};
