import * as yup from 'yup';
import { pt } from 'yup-locale-pt';

yup.setLocale(pt);

export const oderSchema = yup.object().shape({
	cliente_id: yup.number().required().min(1),
	observacao: yup.string().max(255),
	pedido_produtos: yup.array().of(
		yup.object().shape({
			produto_id: yup.number().required().min(1),
			quantidade_produto: yup.number().required().min(1)
		})
	)
});
