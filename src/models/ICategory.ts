import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connections/pg_instances';

export interface ICategory extends Model {
	id?: number;
	descricao: string;
}

export const Category = sequelize.define<ICategory>(
	'Category',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER
		},
		descricao: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'categorias',
		timestamps: false
	}
);
