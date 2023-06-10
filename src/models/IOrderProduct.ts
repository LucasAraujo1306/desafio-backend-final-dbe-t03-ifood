import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connections/pg_instances';
import { Order } from './IOrder';

interface IOrderProduct extends Model {
	id?: number;
	pedido_id: number;
	produto_id: number;
	quantidade_produto: number;
	valor_produto: number;
}

export const OrderProduct = sequelize.define<IOrderProduct>(
	'pedido_produtos',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		pedido_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'pedidos',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		},
		produto_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'produtos',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		},
		quantidade_produto: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		valor_produto: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		tableName: 'pedido_produtos',
		timestamps: false
	}
);

OrderProduct.belongsTo(Order, {
	as: 'pedidos',
	constraints: true,
	foreignKey: 'pedido_id'
});

Order.hasMany(OrderProduct, {
	foreignKey: 'pedido_id',
	sourceKey: 'id'
});

export { IOrderProduct };
