import 'dotenv/config';

const { DB_URL, DB_URL_TEST } = process.env;

let db = DB_URL as string;

if (process.env.NODE_ENV === 'test') {
	db = DB_URL_TEST as string;
}

export default db;
