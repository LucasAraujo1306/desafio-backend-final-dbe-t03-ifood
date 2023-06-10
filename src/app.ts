import 'express-async-errors';
import 'dotenv/config';
import express, { Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import errorMiddleware from './middlewares/errors';
import categoryRouter from './routes/categoryRoutes';
import clientRouter from './routes/clientRoutes';
import fileRoutes from './routes/fileRoutes';
import loginRouter from './routes/authUserRoutes';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';
import userRouter from './routes/userRoutes';
import { getPathPackageJson } from './utils/getPathPackageJson';

const app = express();

app.use(cors());
app.use(express.json());
// Aumentar o limite de carga útil para 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get('/swagger', (_, res: Response) => {
	return res.sendFile(process.cwd() + '/swagger.json');
});

app.get('/', async (_, res: Response) => {
	const caminho = await getPathPackageJson();

	res.json({
		version: require(caminho).version,
		authors: require(caminho).author
	});
});

app.use('/categoria', categoryRouter);
app.use('/cliente', clientRouter);
app.use('/arquivo', fileRoutes);
app.use('/login', loginRouter);
app.use('/pedido', orderRoutes);
app.use('/produto', productRoutes);
app.use('/usuario', userRouter);

app.use((_, res: Response) => {
	res.status(404).json({ error: 'Page Not Found' });
});
app.use(errorMiddleware);

export default app;
