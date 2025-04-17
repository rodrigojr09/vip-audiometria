import { Pessoa } from "@prisma/client";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";
import moment from ".//moment";
import { readFileSync } from "fs";

export default async function getRequisicao(pessoa: Pessoa) {
	const response = readFileSync("./assets/Requisicao.docx");

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

	doc.render(data);

	return doc.getZip().generate({ type: "nodebuffer" });
}
