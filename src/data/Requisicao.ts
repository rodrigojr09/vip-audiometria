import { Pessoa } from "../../prisma/client";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";
import moment from "../lib/moment";
import { readFileSync } from "fs";
import { logger } from "../lib/Logger";
import { dados } from "./dados";

export default async function getRequisicao(pessoa: Pessoa) {
	try {
		logger.info(`Gerando arquivo de requisição para pessoa: ${pessoa.id}`);

		const response = readFileSync(dados.getFile("Requisicao.docx"));
		logger.debug("Template .docx lido com sucesso");

		const zip = new PizZip(response);
		const doc = new DocxTemplater(zip, {
			linebreaks: true,
		});

		const data = {
			nome: pessoa.nome,
			cpf: pessoa.cpf,
			dataExame: moment(pessoa.dataExame).format("DD/MM/YYYY"),
			funcao: pessoa.funcao,
			empresa: pessoa.empresa,
			nascimento: moment(pessoa.dataNascimento).format("DD/MM/YYYY"),
			tipoExame: pessoa.tipoExame,
			responsavel: pessoa.responsavel,
			documento: pessoa.documento,
		};

		logger.debug(`Dados para o template: ${JSON.stringify(data)}`);

		doc.render(data);
		logger.info(
			`Documento de requisição renderizado com sucesso para ID ${pessoa.id}`
		);

		return doc.getZip().generate({ type: "nodebuffer" });
	} catch (error: any) {
		logger.error(
			`Erro ao gerar documento de requisição para pessoa ID ${pessoa.id}: ${error.message}`
		);
		throw error;
	}
}
