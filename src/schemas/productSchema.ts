import * as yup from 'yup';
import { pt } from 'yup-locale-pt';

yup.setLocale(pt);

export const productSchema = yup.object().shape({
	descricao: yup
		.string()
		.max(255)
		.required()
		.matches(/^(?!\s)(?!.*\s$)(?!.*?\s\s).*$/, 'Não são permitidos espaços em branco/duplicados'),
	quantidade_estoque: yup.number().required().min(1),
	valor: yup.number().required().min(1),
	categoria_id: yup.number().required().min(1),
	produto_imagem: yup.string().max(255)
});
