import fs from 'fs/promises';
import handlebars from 'handlebars';

export const compilerHTML = async (file: string, context: object) => {
	const html = await fs.readFile(file);
	const template = handlebars.compile(html.toString());

	return template(context);
};
