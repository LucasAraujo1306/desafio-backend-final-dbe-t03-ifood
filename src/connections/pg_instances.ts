import { Sequelize } from 'sequelize';
import db from './db_instances';

export const sequelize = new Sequelize(db, { logging: false });
