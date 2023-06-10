import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { searchZipCode } from '../utils/consultZipCode';

yup.setLocale(pt);

export const clientSchema = yup.object().shape({
	nome: yup
		.string()
		.required()
		.max(255)
		.matches(/^(?!\s)(?!.*\s$)(?!.*?\s\s).*$/, 'Não são permitidos espaços em branco/duplicados'),
	email: yup
		.string()
		.email()
		.max(255)
		.required()
		.matches(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'email deve ser um e-mail válido'
		),
	cpf: yup
		.string()
		.min(11, 'O cpf deve conter no mínimo 11 caracteres')
		.max(14, "O cpf deve conter no máximo 14 caracteres incluindo '.' e '-'")
		.required()
		.test('cpf', 'CPF inválido', (value) => {
			if (!value) {
				return false;
			}

			const cpf = value.replace(/[^\d]/g, '');

			if (cpf.length !== 11) {
				return false;
			}

			let sum = 0;
			let remainder = 0;

			for (let i = 1; i <= 9; i++) {
				sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
			}

			remainder = (sum * 10) % 11;

			if (remainder === 10 || remainder === 11) {
				remainder = 0;
			}

			if (remainder !== parseInt(cpf.substring(9, 10))) {
				return false;
			}

			sum = 0;

			for (let i = 1; i <= 10; i++) {
				sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
			}

			remainder = (sum * 10) % 11;

			if (remainder === 10 || remainder === 11) {
				remainder = 0;
			}

			if (remainder !== parseInt(cpf.substring(10, 11))) {
				return false;
			}

			return true;
		}),
	cep: yup
		.string()
		.max(9, 'o cep deve ter no máximo 9 carateres com o -')
		.test('cep-valido', 'CEP não encontrado', async (value) => {
			if (!value) {
				return true;
			}
			try {
				const result = await searchZipCode(value);
				if (result.cep == undefined) {
					return false;
				}
				return true;
			} catch (error) {
				throw new yup.ValidationError(`${value} não foi encontrado`);
			}
		}),
	numero: yup.string().trim().max(10)
});
