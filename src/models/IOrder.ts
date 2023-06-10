import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connections/pg_instances';
import { OrderProduct } from './IOrderProduct';

interface IOrder extends Model {
	id?: number;
	cliente_id: number;
	observacao?: string;
	valor_total: number;
}

export const Order = sequelize.define<IOrder>(
	'Oder',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		cliente_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'clientes',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		},
		observacao: {
			type: DataTypes.STRING,
			allowNull: true
		},
		valor_total: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		tableName: 'pedidos',
		timestamps: false
	}
);

export { IOrder };
