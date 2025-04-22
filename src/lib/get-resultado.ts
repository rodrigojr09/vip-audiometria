import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";
import ImageModule from "docxtemplater-image-module-free";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { Pessoa, ResultadoType } from "../../prisma/client";
import moment from "./moment";
import { logger } from "./Logger";
import { dados } from "./dados";

const width = 600;
const height = 385;

async function createChartImageBuffer(resultado: ResultadoType) {
	try {
		logger.info("Gerando gráficos de audiometria...");

		const chartJSNodeCanvas = new ChartJSNodeCanvas({
			width,
			height,
		});

		const options = {
			scales: {
				y: {
					min: -10,
					max: 120,
					grid: { color: "#ccc" },
				},
				x: {
					grid: { color: "#ccc" },
				},
			},
		};

		const labels = [
			"0",
			"250",
			"500",
			"1000",
			"2000",
			"3000",
			"4000",
			"6000",
			"8000",
		];

		const odData = [
			resultado.d250,
			resultado.d250,
			resultado.d500,
			resultado.d1000,
			resultado.d2000,
			resultado.d3000,
			resultado.d4000,
			resultado.d6000,
			resultado.d8000,
			resultado.d8000,
		].map((a) => parseInt(a));

		const oeData = [
			resultado.e250,
			resultado.e250,
			resultado.e500,
			resultado.e1000,
			resultado.e2000,
			resultado.e3000,
			resultado.e4000,
			resultado.e6000,
			resultado.e8000,
			resultado.e8000,
		].map((a) => parseInt(a));

		const odBuffer = chartJSNodeCanvas.renderToBufferSync({
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: "Orelha Direita",
						data: odData,
						pointBackgroundColor: "white",
						pointBorderColor: "red",
						borderColor: "red",
						pointRadius: 7,
						pointHoverRadius: 10,
					},
				],
			},
			options,
		});

		const oeBuffer = chartJSNodeCanvas.renderToBufferSync({
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: "Orelha Esquerda",
						data: oeData,
						pointBackgroundColor: "white",
						pointBorderColor: "blue",
						pointStyle: "crossRot", // "X" no ponto
						borderColor: "blue",
						borderDash: [5, 5], // linha tracejada
						pointRadius: 7,
						pointHoverRadius: 10,
					},
				],
			},
			options,
		});

		if (existsSync(dados.paths.logs + "/" + "od.png")) {
			unlinkSync(dados.paths.logs + "/" + "od.png");
			logger.debug("Arquivo anterior od.png deletado");
		}
		if (existsSync(dados.paths.logs + "/" + "od.png")) {
			unlinkSync(dados.paths.logs + "/" + "od.png");
			logger.debug("Arquivo anterior oe.png deletado");
		}

		saveFile(odBuffer, "od.png");
		saveFile(oeBuffer, "oe.png");

		logger.info("Gráficos de audiometria gerados com sucesso");
		return true;
	} catch (error: any) {
		logger.error(`Erro ao gerar gráficos: ${error.message}`);
		throw error;
	}
}

function saveFile(buffer: Buffer, fileName: string) {
	writeFileSync(dados.paths.logs + "/" + fileName, buffer);
	logger.debug(`Arquivo salvo: ${fileName}`);
}

export async function getResultadoFile(pessoa: Pessoa) {
	try {
		logger.info(
			`Gerando documento de resultado para pessoa ID ${pessoa.id}`
		);

		const response = readFileSync(dados.getFile("Resultado.docx"));
		logger.debug("Template Resultado.docx carregado");

		await createChartImageBuffer(pessoa.resultados!);

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
			e0: pessoa.resultados?.ecera,
			d0: pessoa.resultados?.dcera,
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
			resultadoE: dados.paths.logs + "/" + "od.png",
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
