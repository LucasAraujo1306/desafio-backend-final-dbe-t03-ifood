import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connections/pg_instances';

export interface IUser extends Model {
	id?: number;
	nome: string;
	email: string;
	senha: string;
}

export const User = sequelize.define<IUser>(
	'User',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		senha: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	},
	{
		tableName: 'usuarios',
		timestamps: false
	}
);
