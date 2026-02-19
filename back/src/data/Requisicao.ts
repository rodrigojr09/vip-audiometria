import { readFileSync } from "node:fs";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";
import { logger } from "../lib/Logger";
import moment from "../lib/moment";
import { dados } from "./dados";
import { Exame } from "../types/types";

export default async function getRequisicao(exame: Exame) {
    try {
        logger.info(`Gerando arquivo de requisição para exame: ${exame.id}`);

        const response = readFileSync(dados.getFile("Requisicao.docx"));
        logger.debug("Template .docx lido com sucesso");

        const zip = new PizZip(response);
        const doc = new DocxTemplater(zip, {
            linebreaks: true,
        });

        const data = {
            nome: exame.pessoa.nome,
            cpf: exame.pessoa.cpf,
            dataExame: moment(exame.dataExame).format("DD/MM/YYYY"),
            funcao: exame.funcao,
            empresa: exame.empresa,
            nascimento: moment(exame.pessoa.dataNascimento).format("DD/MM/YYYY"),
            tipoExame: exame.tipoExame,
            responsavel: exame.responsavel,
            documento: exame.documento,
        };

        logger.debug(`Dados para o template: ${JSON.stringify(data)}`);

        doc.render(data);
        logger.info(
            `Documento de requisição renderizado com sucesso para ID ${exame.id}`
        );

        return doc.getZip().generate({ type: "nodebuffer" });
    } catch (error: any) {
        logger.error(
            `Erro ao gerar documento de requisição para exame ID ${exame.id}: ${error.message}`
        );
        throw error;
    }
}
