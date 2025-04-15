import { Pessoa } from "@prisma/client";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";
import axios from "axios";
import moment from "./moment";

export default async function getRequisicao(pessoa: Pessoa) {
	const response = await axios.get(
		"https://audiometria.vipsst.com.br/arquivos/Requisicao.docx",
		{
			responseType: "arraybuffer",
		}
	);

	const zip = new PizZip(response.data);
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
