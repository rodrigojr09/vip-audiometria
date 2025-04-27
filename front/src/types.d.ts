export interface Pessoa {
	id: string;
	nome: string;
	cpf: string;
	dataNascimento: string;
	dataExame: string;
	tipoExame: string;
	funcao: string;
	empresa: string;
	responsavel: string;
	documento: string;
	resultados?: ResultadoType;
}

export interface ResultadoType {
	od: string;
	d250: string;
	d500: string;
	d1000: string;
	d2000: string;
	d3000: string;
	d4000: string;
	d6000: string;
	d8000: string;
	oe: string;
	e250: string;
	e500: string;
	e1000: string;
	e2000: string;
	e3000: string;
	e4000: string;
	e6000: string;
	e8000: string;
	obs: string;
	ossea?: ViaOssea;
}

export interface ViaOssea {
	od: boolean;
	d400: string | null;
	d500: string | null;
	d1000: string | null;
	d2000: string | null;
	d3000: string | null;
	d4000: string | null;
	oe: boolean;
	e500: string | null;
	e1000: string | null;
	e2000: string | null;
	e3000: string | null;
	e4000: string | null;
}
