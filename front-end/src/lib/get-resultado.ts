import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import DocxTemplater from "docxtemplater";
import PizZip from "pizzip";
import ImageModule from "docxtemplater-image-module-free";
import axios from "axios";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { Pessoa, ResultadoType } from "@prisma/client";
import moment from "./moment";

const width = 600;
const height = 385;

async function createChartImageBuffer(resultado: ResultadoType) {
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

	const odBuffer = chartJSNodeCanvas.renderToBufferSync({
		type: "line",
		data: {
			labels,
			datasets: [
				{
					label: "Orelha Direita",
					data: [
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
					].map((a) => parseInt(a)),
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
					data: [
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
					].map((a) => parseInt(a)),

					pointBackgroundColor: "white",
					pointBorderColor: "blue",
					borderColor: "blue",
					pointRadius: 7,
					pointHoverRadius: 10,
				},
			],
		},
		options,
	});
	if (existsSync("./public/od.png")) unlinkSync("./public/od.png");
	if (existsSync("./public/oe.png")) unlinkSync("./public/oe.png");
	saveFile(odBuffer, "od.png");
	saveFile(oeBuffer, "oe.png");
	return true;
}

function saveFile(buffer: Buffer, fileName: string) {
	writeFileSync("./public/" + fileName, buffer);
}

export async function getResultadoFile(pessoa: Pessoa) {
	try {
		const response = await axios.get(
			"http://localhost:3000/arquivos/Resultado.docx",
			{
				responseType: "arraybuffer",
			}
		);

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

		const zip = new PizZip(response.data);
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
			resultadoD: "public/od.png",
			resultadoE: "public/oe.png",
		};
		doc.render(data);

		const finalBuffer = doc.getZip().generate({ type: "nodebuffer" });
		return finalBuffer;
	} catch (error) {
		console.error("Erro ao renderizar o template:", error);
		throw error;
	}
}
