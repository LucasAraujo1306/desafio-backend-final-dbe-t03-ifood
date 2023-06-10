import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connections/pg_instances';
import { Category } from './ICategory';

export interface IProduct extends Model {
	id?: number;
	descricao: string;
	quantidade_estoque: number;
	valor: number;
	categoria_id: number;
	produto_imagem?: string | null;
}

export const Product = sequelize.define<IProduct>(
	'Product',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER
		},
		descricao: {
			type: DataTypes.STRING,
			allowNull: false
		},
		quantidade_estoque: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		valor: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		produto_imagem: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		}
	},
	{
		tableName: 'produtos',
		timestamps: false
	}
);

Product.belongsTo(Category, {
	as: 'categoria',
	constraints: true,
	foreignKey: 'categoria_id'
});

Category.hasMany(Product, {
	foreignKey: 'categoria_id'
});
