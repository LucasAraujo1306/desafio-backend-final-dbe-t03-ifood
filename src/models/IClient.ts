import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connections/pg_instances';

export interface IClient extends Model {
	id?: number;
	nome: string;
	email: string;
	cpf: string;
	cep?: string;
	rua?: string;
	numero?: string;
	bairro?: string;
	cidade?: string;
	estado?: string;
}

export const Client = sequelize.define<IClient>(
	'Client',
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
		cpf: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		cep: {
			type: DataTypes.STRING,
			allowNull: true
		},
		rua: {
			type: DataTypes.STRING,
			allowNull: true
		},
		numero: {
			type: DataTypes.STRING,
			allowNull: true
		},
		bairro: {
			type: DataTypes.STRING,
			allowNull: true
		},
		cidade: {
			type: DataTypes.STRING,
			allowNull: true
		},
		estado: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		tableName: 'clientes',
		timestamps: false
	}
);
