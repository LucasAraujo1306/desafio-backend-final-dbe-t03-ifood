import { BadRequestError } from '../errors';

export const bufferAndTypeImageGeneration = (imagem: any) => {
	const buffer = Buffer.from(imagem, 'base64');

	let imagemType;
	if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
		imagemType = 'image/png';
	} else if (buffer[0] === 0xff && buffer[1] === 0xd8) {
		imagemType = 'image/jpeg';
	} else if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
		imagemType = 'image/gif';
	} else {
		throw new BadRequestError('Formato de imagem inválido, envie uma imagem PNG, JPEG ou GIF');
	}

	return { buffer, imagemType };
};
