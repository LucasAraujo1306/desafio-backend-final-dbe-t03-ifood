import axios from 'axios';
import { BadRequestError, getErrorMessage } from '../errors';

interface cep_cep {
	cep: string;
	rua: string;
	bairro: string;
	cidade: string;
	estado: string;
}

export const searchZipCode = async (cep: string): Promise<cep_cep> => {
	try {
		const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
		const address = {
			cep: response.data.cep,
			rua: response.data.logradouro,
			bairro: response.data.bairro,
			cidade: response.data.localidade,
			estado: response.data.uf
		};

		return address as cep_cep;
	} catch (error) {
		throw new BadRequestError(getErrorMessage(error));
	}
};
