import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";
import ImageModule from "docxtemplater-image-module-free";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { Pessoa, ResultadoType } from "../../prisma/client";
import moment from "../lib/moment";
import { logger } from "../lib/Logger";
import { dados } from "./dados";
import { ChartOptions } from "chart.js";
import { Grafico } from "@/lib/Grafico";

function saveFile(buffer: Buffer, fileName: string) {
	writeFileSync(dados.paths.logs + "/" + fileName, buffer);
	logger.debug(`Arquivo salvo: ${fileName}`);
}

export async function getResultado(pessoa: Pessoa) {
	try {
		logger.info(
			`Gerando documento de resultado para pessoa ID ${pessoa.id}`
		);

		const response = readFileSync(dados.getFile("Resultado.docx"));
		logger.debug("Template Resultado.docx carregado");
		logger.info("Gerando gráficos de audiometria...");
		saveFile(
			await Grafico(
				[
					pessoa.resultados?.d250,
					pessoa.resultados?.d250,
					pessoa.resultados?.d500,
					pessoa.resultados?.d1000,
					pessoa.resultados?.d2000,
					pessoa.resultados?.d3000,
					pessoa.resultados?.d4000,
					pessoa.resultados?.d6000,
					pessoa.resultados?.d8000,
					pessoa.resultados?.d8000,
				].map((a) => parseInt(a || "0")),
				"d",
				pessoa.resultados?.ossea?.od
			),
			"od.png"
		);

		saveFile(
			await Grafico(
				[
					pessoa.resultados?.e250,
					pessoa.resultados?.e250,
					pessoa.resultados?.e500,
					pessoa.resultados?.e1000,
					pessoa.resultados?.e2000,
					pessoa.resultados?.e3000,
					pessoa.resultados?.e4000,
					pessoa.resultados?.e6000,
					pessoa.resultados?.e8000,
					pessoa.resultados?.e8000,
				].map((a) => parseInt(a || "0")),
				"e",
				pessoa.resultados?.ossea?.oe
			),
			"oe.png"
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
			nome: pessoa.nome,
			cpf: pessoa.cpf,
			nascimento: moment(pessoa.dataNascimento).format("DD/MM/YYYY"),
			empresa: pessoa.empresa,
			funcao: pessoa.funcao,
			tipoExame: pessoa.tipoExame,
			dataExame: moment(pessoa.dataExame).format("DD/MM/YYYY"),
			responsavel: pessoa.responsavel,
			documento: pessoa.documento,
			od: pessoa.resultados?.od || "NORMAL",
			oe: pessoa.resultados?.oe || "NORMAL",
			d1: pessoa.resultados?.d250,
			e1: pessoa.resultados?.e250,
			d2: pessoa.resultados?.d500,
			e2: pessoa.resultados?.e500,
			d3: pessoa.resultados?.d1000,
			e3: pessoa.resultados?.e1000,
			d4: pessoa.resultados?.d2000,
			e4: pessoa.resultados?.e2000,
			d5: pessoa.resultados?.d3000,
			e5: pessoa.resultados?.e3000,
			d6: pessoa.resultados?.d4000,
			e6: pessoa.resultados?.e4000,
			d7: pessoa.resultados?.d6000,
			e7: pessoa.resultados?.e6000,
			d8: pessoa.resultados?.d8000,
			e8: pessoa.resultados?.e8000,
			obs:
				pessoa.resultados?.obs.replaceAll("<br>", "\n") ||
				"Nenhuma observação",
			resultadoD: dados.paths.logs + "/" + "od.png",
			resultadoE: dados.paths.logs + "/" + "oe.png",
			o1: pessoa.resultados?.ossea?.d500 || "-",
			o2: pessoa.resultados?.ossea?.d1000 || "-",
			o3: pessoa.resultados?.ossea?.d2000 || "-",
			o4: pessoa.resultados?.ossea?.d3000 || "-",
			o5: pessoa.resultados?.ossea?.d4000 || "-",
			o6: pessoa.resultados?.ossea?.e500 || "-",
			o7: pessoa.resultados?.ossea?.e1000 || "-",
			o8: pessoa.resultados?.ossea?.e2000 || "-",
			o9: pessoa.resultados?.ossea?.e3000 || "-",
			o10: pessoa.resultados?.ossea?.e4000 || "-",
		};

		logger.debug("Dados para preenchimento do template montados");

		doc.render(data);
		logger.info(
			`Documento preenchido com sucesso para pessoa ID ${pessoa.id}`
		);

		const finalBuffer = doc.getZip().generate({ type: "nodebuffer" });
		return finalBuffer;
	} catch (error: any) {
		logger.error(
			`Erro ao gerar documento de resultado para pessoa ID ${pessoa.id}: ${error.message}`
		);
		throw error;
	}
}
