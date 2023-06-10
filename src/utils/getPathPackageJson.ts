import fs from 'fs/promises';
import path from 'path';

export const getPathPackageJson = async (): Promise<string> => {
	const pathFileJson = path.resolve(__dirname, '../../package.json');
	try {
		await fs.readFile(pathFileJson, 'utf8');

		return '../package.json';
	} catch (error) {
		return '../../package.json';
	}
};
