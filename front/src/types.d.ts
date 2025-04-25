interface Pessoa {
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

interface ResultadoType {
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

interface ViaOssea {
	od?: string;
	d400?: string;
	d500?: string;
	d1000?: string;
	d2000?: string;
	d3000?: string;
	d4000?: string;
	oe?: string;
	e500?: string;
	e1000?: string;
	e2000?: string;
	e3000?: string;
	e4000?: string;
}
