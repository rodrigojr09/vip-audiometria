import { app } from "electron";
import MomentJS from "moment-timezone";
import ExcelJS from "exceljs";
import * as fs from "fs";

function moment(date?: string) {
	return MomentJS(date).tz("America/Sao_Paulo");
}

const path_data = `${app.getPath("documents")}/VIP-Audiometria`;

export interface PessoaType {
	id: string;
	nome: string;
	cpf: string;
	dataNascimento: string;
	dataExame: string;
	tipoExame: string;
	funcao: string;
	empresa: string;
	responsavel: string;
	resultados: ResultadoType | undefined;
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
	dcera: string;
	oe: string;
	e250: string;
	e500: string;
	e1000: string;
	e2000: string;
	e3000: string;
	e4000: string;
	e6000: string;
	e8000: string;
	ecera: string;
	obs: string;
}

export default class DataProvider {
	private getPath() {
		if (!fs.existsSync(path_data)) fs.mkdirSync(path_data);
		if (!fs.existsSync(path_data + "/data.json"))
			fs.writeFileSync(
				path_data + "/data.json",
				JSON.stringify({ version: "1.0.0", datas: [] })
			);
		return path_data + "/data.json";
	}

	constructor() {
		this.getPath();
	}

	async getData(id?: string) {
		const data = JSON.parse(fs.readFileSync(this.getPath()).toString());
		return id
			? data.datas.find((d: PessoaType) => d.id === id)
			: data.datas;
	}

	async createData(data: PessoaType) {
		const dataFile = JSON.parse(fs.readFileSync(this.getPath()).toString());
		dataFile.datas.push(data);
		fs.writeFileSync(this.getPath(), JSON.stringify(dataFile));
		return data;
	}

	async updateData(data: PessoaType) {
		const dataFile = JSON.parse(fs.readFileSync(this.getPath()).toString());
		const datas = dataFile.datas.map((d: PessoaType) => {
			if (d.id === data.id) return data;
			return d;
		});
		fs.writeFileSync(
			this.getPath(),
			JSON.stringify({ version: dataFile.version, datas })
		);
		return data;
	}

	async deleteData(id: string) {
		const dataFile = JSON.parse(fs.readFileSync(this.getPath()).toString());
		const datas = dataFile.datas.filter((d: PessoaType) => d.id !== id);
		fs.writeFileSync(
			this.getPath(),
			JSON.stringify({ version: dataFile.version, datas })
		);
		return id;
	}

	async downloadData(id: string, type: "resultado" | "requisicao") {
		const data = (await this.getData(id)) as PessoaType;
		if (!data) return undefined;

		if (type === "requisicao") {
			const filePath = `${path_data}/Requisicao.xlsx`;

			try {
				const workbook = new ExcelJS.Workbook();
				await workbook.xlsx.readFile(filePath);
				const worksheet = workbook.getWorksheet(1);

				if (!worksheet) {
					console.error("❌ Planilha não encontrada no arquivo!");
					return;
				}

				// 📌 Atualiza a célula B3 sem perder formatação
				const nameCell = worksheet.getRow(3).getCell(2);
				const nascimentoCell = worksheet.getRow(3).getCell(7);
				const cpfCell = worksheet.getRow(4).getCell(2);
				const dataExameCell = worksheet.getRow(5).getCell(2);
				const funcaoCell = worksheet.getRow(6).getCell(2);
				const empresaCell = worksheet.getRow(7).getCell(2);
				const tipoExameCell = worksheet.getRow(4).getCell(7);

				nameCell.value = data.nome;
				nascimentoCell.value = moment(data.dataNascimento).format(
					"DD/MM/YYYY"
				);
				cpfCell.value = data.cpf;
				dataExameCell.value = moment(data.dataExame).format(
					"DD/MM/YYYY"
				);
				funcaoCell.value = data.funcao;
				empresaCell.value = data.empresa;
				tipoExameCell.value = `(${
					data.tipoExame === "admissional" ? "X" : " "
				})Adm  (${data.tipoExame === "demissional" ? "X" : " "})Dem  (${
					data.tipoExame === "periodico" ? "X" : " "
				})Per  (${data.tipoExame === "mudanca" ? "X" : " "})Mud. Fun`;

				// 📌 Salva as alterações no arquivo
				return await workbook.xlsx.writeBuffer();
			} catch (error) {
				console.error("❌ Erro ao atualizar a planilha:", error);
				return undefined;
			}
		} else {
			try {
				const filePath = `${path_data}/Resultado.xlsx`;
				const workbook = new ExcelJS.Workbook();
				await workbook.xlsx.readFile(filePath);
				const worksheet = workbook.getWorksheet(23);

				if (!worksheet) {
					console.error("❌ Planilha não encontrada no arquivo!");
					return;
				}

				const nameCell = worksheet.getRow(11).getCell(7);
				const cpfCell = worksheet.getRow(12).getCell(7);
				const dataExameCell = worksheet.getRow(13).getCell(7);
				const tipoExameCell = worksheet.getRow(12).getCell(18);
				const empresaCell = worksheet.getRow(13).getCell(18);
				const dataNascimento = worksheet.getRow(11).getCell(29);
				const funcaoCell = worksheet.getRow(12).getCell(28);

				// Resultados Direito
				const d8000Cell = worksheet.getRow(22).getCell(13);
				const d6000Cell = worksheet.getRow(22).getCell(12);
				const d4000Cell = worksheet.getRow(22).getCell(11);
				const d3000Cell = worksheet.getRow(22).getCell(10);
				const d2000Cell = worksheet.getRow(22).getCell(9);
				const d1000Cell = worksheet.getRow(22).getCell(8);
				const d500Cell = worksheet.getRow(22).getCell(7);
				const d250Cell = worksheet.getRow(22).getCell(6);
				// Resultados Esquerdo
				const e8000Cell = worksheet.getRow(22).getCell(29);
				const e6000Cell = worksheet.getRow(22).getCell(28);
				const e4000Cell = worksheet.getRow(22).getCell(27);
				const e3000Cell = worksheet.getRow(22).getCell(26);
				const e2000Cell = worksheet.getRow(22).getCell(25);
				const e1000Cell = worksheet.getRow(22).getCell(24);
				const e500Cell = worksheet.getRow(22).getCell(23);
				const e250Cell = worksheet.getRow(22).getCell(22);

				d8000Cell.value = data.resultados?.d8000;
				d6000Cell.value = data.resultados?.d6000;
				d4000Cell.value = data.resultados?.d4000;
				d3000Cell.value = data.resultados?.d3000;
				d2000Cell.value = data.resultados?.d2000;
				d1000Cell.value = data.resultados?.d1000;
				d500Cell.value = data.resultados?.d500;
				d250Cell.value = data.resultados?.d250;
				e8000Cell.value = data.resultados?.e8000;
				e6000Cell.value = data.resultados?.e6000;
				e4000Cell.value = data.resultados?.e4000;
				e3000Cell.value = data.resultados?.e3000;
				e2000Cell.value = data.resultados?.e2000;
				e1000Cell.value = data.resultados?.e1000;
				e500Cell.value = data.resultados?.e500;
				e250Cell.value = data.resultados?.e250;

				nameCell.value = data.nome.toUpperCase();
				cpfCell.value = data.cpf;
				dataExameCell.value = moment(data.dataExame).format(
					"DD/MM/YYYY"
				);
				tipoExameCell.value = data.tipoExame.toUpperCase();
				empresaCell.value = data.empresa.toUpperCase();
				dataNascimento.value = moment(data.dataNascimento).format(
					"DD/MM/YYYY"
				);
				funcaoCell.value = data.funcao.toUpperCase();

				const buffer = await workbook.xlsx.writeBuffer();

				return buffer;
			} catch (error) {
				console.error("❌ Erro ao atualizar a planilha:", error);
				return undefined;
			}
		}
	}
}
