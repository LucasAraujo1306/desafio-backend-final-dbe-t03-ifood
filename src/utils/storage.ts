import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = new aws.Endpoint(process.env.S3_ENDPOINT!);

const s3 = new aws.S3({
	endpoint,
	credentials: {
		accessKeyId: process.env.KEY_ID!,
		secretAccessKey: process.env.APPLICATION_KEY!
	}
});

const getAllUrl = async () => {
	const pathKey = await s3.listObjectsV2({ Bucket: process.env.B_B_BUCKET_NAME as string }).promise();

	const urlsImagens = pathKey.Contents?.map((objeto) => {
		const baseUrl = `https://${process.env.B_B_BUCKET_NAME}.${process.env.S3_ENDPOINT}`;
		const imagePath = objeto.Key;
		return {
			url: `${baseUrl}/${imagePath}`,
			path: `/${imagePath}`
		};
	});

	return urlsImagens;
};

const registerCloudImage = async (path: string, buffer: Buffer, mimetype?: string) => {
	const file = await s3
		.upload({
			Bucket: process.env.B_B_BUCKET_NAME!,
			Key: path,
			Body: buffer,
			ContentType: mimetype
		})
		.promise();

	return {
		url: file.Location,
		path: file.Key
	};
};

const deletedCloudImage = async (path: string) => {
	const deleted = await s3
		.deleteObject({
			Bucket: process.env.B_B_BUCKET_NAME!,
			Key: path
		})
		.promise();

	return deleted;
};

const getPath = (url: string) => {
	const urlFile = url.split(`/`);
	const filePath = urlFile.slice(4).join('/');

	return filePath;
};

export { registerCloudImage, deletedCloudImage, getPath, getAllUrl };
