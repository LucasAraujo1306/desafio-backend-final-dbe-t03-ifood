require('dotenv').config();

const urlObjDev = new URL(process.env.DB_URL);
const devUsername = urlObjDev.username;
const devPassword = urlObjDev.password;
const devHost = urlObjDev.host.substring(0, urlObjDev.host.indexOf(':'));
const devPort = urlObjDev.port;
const devPathname = urlObjDev.pathname.substring(1);
const devDialect = urlObjDev.protocol.replace(':', '');

const urlObjTest = new URL(process.env.DB_URL_TEST);
const testUsername = urlObjTest.username;
const testPassword = urlObjTest.password;
const testHost = urlObjTest.host.substring(0, urlObjDev.host.indexOf(':'));
const testPort = urlObjTest.port;
const testPathname = urlObjTest.pathname.substring(1);
const testDialect = urlObjTest.protocol.replace(':', '');

module.exports = {
	development: {
		username: devUsername,
		password: devPassword,
		database: devPathname,
		host: devHost,
		port: devPort,
		dialect: devDialect,
	},
	test: {
		username: testUsername,
		password: testPassword,
		database: testPathname,
		host: testHost,
		port: testPort,
		dialect: testDialect
	},
	production: {
		username: devUsername,
		password: devPassword,
		database: devPathname,
		host: devHost,
		port: devPort,
		dialect: devDialect
	}
};
