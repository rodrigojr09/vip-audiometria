import { readFileSync, writeFileSync } from "node:fs";
import DocxTemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";
import PizZip from "pizzip";
import { Grafico } from "../lib/Grafico";
import { logger } from "../lib/Logger";
import moment from "../lib/moment";
import { dados } from "./dados";
import type { Exame } from "../types/types";

function saveFile(buffer: Buffer, fileName: string) {
    writeFileSync(`${dados.paths.logs}/${fileName}`, buffer);
    logger.debug(`Arquivo salvo: ${fileName}`);
}

export async function getResultado(exame: Exame) {

    try {
        logger.info(`Gerando documento de resultado para exame ID ${exame.id}`);

        const response = readFileSync(dados.getFile("Resultado.docx"));
        logger.debug("Template Resultado.docx carregado");
        logger.info("Gerando gráficos de audiometria...");
        saveFile(
            await Grafico(
                [
                    exame.resultados?.d250,
                    exame.resultados?.d250,
                    exame.resultados?.d500,
                    exame.resultados?.d1000,
                    exame.resultados?.d2000,
                    exame.resultados?.d3000,
                    exame.resultados?.d4000,
                    exame.resultados?.d6000,
                    exame.resultados?.d8000,
                    exame.resultados?.d8000,
                ].map((a) => parseInt(a || "0", 10)),
                "d",
                [
                    exame.resultados?.ossea?.d500,
                    exame.resultados?.ossea?.d1000,
                    exame.resultados?.ossea?.d2000,
                    exame.resultados?.ossea?.d3000,
                    exame.resultados?.ossea?.d4000,
                ].map((a) => parseInt(a || "0", 10)),
                exame.resultados?.ossea?.od,
            ),
            "od.png",
        );

        saveFile(
            await Grafico(
                [
                    exame.resultados?.e250,
                    exame.resultados?.e250,
                    exame.resultados?.e500,
                    exame.resultados?.e1000,
                    exame.resultados?.e2000,
                    exame.resultados?.e3000,
                    exame.resultados?.e4000,
                    exame.resultados?.e6000,
                    exame.resultados?.e8000,
                    exame.resultados?.e8000,
                ].map((a) => parseInt(a || "0", 10)),
                "e",
                [
                    exame.resultados?.ossea?.e500,
                    exame.resultados?.ossea?.e1000,
                    exame.resultados?.ossea?.e2000,
                    exame.resultados?.ossea?.e3000,
                    exame.resultados?.ossea?.e4000,
                ].map((a) => parseInt(a || "0", 10)),
                exame.resultados?.ossea?.oe,
            ),
            "oe.png",
        );

        const imageModule = new ImageModule({
            centered: false,
            fileType: "docx",
            getImage(tag: any) {
                return readFileSync(tag);
            },
            getSize() {
                return [272.126, 174.614];
            },
        });

        const zip = new PizZip(response);
        const doc = new DocxTemplater(zip, {
            modules: [imageModule],
            linebreaks: true,
        });

        const data = {
            nome: exame.pessoa.nome,
            cpf: exame.pessoa.cpf,
            nascimento: moment(exame.pessoa.dataNascimento).format("DD/MM/YYYY"),
            empresa: exame.empresa.nome,
            funcao: exame.funcao,
            tipoExame: exame.tipoExame,
            dataExame: moment(exame.dataExame).format("DD/MM/YYYY"),
            calibracao: exame.calibracao || "",
            responsavel: exame.responsavel,
            documento: exame.documento,
            od: exame.resultados?.od || "NORMAL",
            oe: exame.resultados?.oe || "NORMAL",
            d1: exame.resultados?.d250,
            e1: exame.resultados?.e250,
            d2: exame.resultados?.d500,
            e2: exame.resultados?.e500,
            d3: exame.resultados?.d1000,
            e3: exame.resultados?.e1000,
            d4: exame.resultados?.d2000,
            e4: exame.resultados?.e2000,
            d5: exame.resultados?.d3000,
            e5: exame.resultados?.e3000,
            d6: exame.resultados?.d4000,
            e6: exame.resultados?.e4000,
            d7: exame.resultados?.d6000,
            e7: exame.resultados?.e6000,
            d8: exame.resultados?.d8000,
            e8: exame.resultados?.e8000,
            obs:
                exame.resultados?.obs.replaceAll("<br>", "\n") || "Nenhuma observação",
            resultadoD: `${dados.paths.logs}/od.png`,
            resultadoE: `${dados.paths.logs}/oe.png`,
            o1: exame.resultados?.ossea?.d500 || "-",
            o2: exame.resultados?.ossea?.d1000 || "-",
            o3: exame.resultados?.ossea?.d2000 || "-",
            o4: exame.resultados?.ossea?.d3000 || "-",
            o5: exame.resultados?.ossea?.d4000 || "-",
            o6: exame.resultados?.ossea?.e500 || "-",
            o7: exame.resultados?.ossea?.e1000 || "-",
            o8: exame.resultados?.ossea?.e2000 || "-",
            o9: exame.resultados?.ossea?.e3000 || "-",
            o10: exame.resultados?.ossea?.e4000 || "-",
        };

        logger.debug("Dados para preenchimento do template montados");

        doc.render(data);
        logger.info(`Documento preenchido com sucesso para exame ID ${exame.id}`);

        const finalBuffer = doc.getZip().generate({ type: "nodebuffer" });
        return finalBuffer;
    } catch (error: any) {
        logger.error(
            `Erro ao gerar documento de resultado para exame ID ${exame.id}: ${error.message}`,
        );
        throw error;
    }
}
