import { Request, Response } from 'express';
import { FileService } from '../services/FileService';
import { bufferAndTypeImageGeneration } from '../utils/bufferAndTypeImageGeneration';

export class FileController {
	constructor(private readonly fileService: FileService) {
		this.uploadFile = this.uploadFile.bind(this);
		this.getAllFiles = this.getAllFiles.bind(this);
	}

	async getAllFiles(req: Request, res: Response) {
		const UrlAndDirectoryOfImagens = await this.fileService.getAllFiles();

		return res.json(UrlAndDirectoryOfImagens);
	}

	async uploadFile(req: Request, res: Response) {
		const { imagem: imageBase64 } = req.body;

		const { buffer, imagemType } = bufferAndTypeImageGeneration(imageBase64);

		const uploadImage = await this.fileService.uploadImage(buffer, imagemType);

		res.status(201).json(uploadImage);
	}
}
