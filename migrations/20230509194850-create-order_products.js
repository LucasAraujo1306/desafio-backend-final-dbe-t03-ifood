'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('pedido_produtos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			pedido_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'pedidos',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			produto_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'produtos',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			quantidade_produto: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			valor_produto: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		});

		await queryInterface.addConstraint('pedido_produtos', {
			type: 'foreign key',
			name: 'fk_pedido_produtos_pedido_id',
			fields: ['pedido_id'],
			references: {
				table: 'pedidos',
				field: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});

		await queryInterface.addConstraint('pedido_produtos', {
			type: 'foreign key',
			name: 'fk_pedido_produtos_produto_id',
			fields: ['produto_id'],
			references: {
				table: 'produtos',
				field: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});
	},
	async down(queryInterface) {
		await queryInterface.removeConstraint(
			'pedido_produtos',
			'fk_pedido_produtos_pedido_id'
		);
		await queryInterface.removeConstraint(
			'pedido_produtos',
			'fk_pedido_produtos_produto_id'
		);
		await queryInterface.dropTable('pedido_produtos');
	}
};
