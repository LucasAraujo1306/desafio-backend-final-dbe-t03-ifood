import { v4 as uuidv4 } from 'uuid';
import { registerCloudImage, deletedCloudImage, getPath, getAllUrl } from '../utils/storage';

export class FileService {
	async getAllFiles() {
		const images = await getAllUrl();
		return images;
	}

	async uploadImage(buffer: Buffer, imagemType?: string) {
		const imageUpdated = await registerCloudImage(
			`produtos/imagem/${uuidv4()}.${imagemType?.split('/')[1]}`,
			buffer,
			imagemType
		);

		return imageUpdated;
	}

	async deleteImage(path: string) {
		const pathImg = await getPath(path);
		const imageDeleted = await deletedCloudImage(pathImg);

		return imageDeleted;
	}
}
