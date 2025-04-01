import { app } from "electron";
import XlsxPopulate from "xlsx-populate";
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
		if (!fs.existsSync(path_data + "/Requisicao.xlsx"))
			fs
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
			const filePath = `${path_data}/Resultado.xlsm`;
			try {
				const workbook = await XlsxPopulate.fromFileAsync(filePath);

				const sheet = workbook.sheets()[0];

				if (!sheet) {
					console.error("❌ Planilha não encontrada!");
					return;
				}

				sheet.cell("G11").value(data.nome.toUpperCase());
				sheet.cell("G12").value(data.cpf);
				sheet
					.cell("G13")
					.value(moment(data.dataExame).format("DD/MM/YYYY"));
				sheet.cell("R12").value(data.tipoExame.toUpperCase());
				sheet.cell("R13").value(data.empresa.toUpperCase());
				sheet
					.cell("AC11")
					.value(moment(data.dataNascimento).format("DD/MM/YYYY"));
				sheet.cell("AB12").value(data.funcao.toUpperCase());

				// Audiometria Direita
				sheet.cell("M22").value(data.resultados?.d8000);
				sheet.cell("L22").value(data.resultados?.d6000);
				sheet.cell("K22").value(data.resultados?.d4000);
				sheet.cell("J22").value(data.resultados?.d3000);
				sheet.cell("I22").value(data.resultados?.d2000);
				sheet.cell("H22").value(data.resultados?.d1000);
				sheet.cell("G22").value(data.resultados?.d500);
				sheet.cell("F22").value(data.resultados?.d250);

				// Audiometria Esquerda
				sheet.cell("AC22").value(data.resultados?.e8000);
				sheet.cell("AB22").value(data.resultados?.e6000);
				sheet.cell("AA22").value(data.resultados?.e4000);
				sheet.cell("Z22").value(data.resultados?.e3000);
				sheet.cell("Y22").value(data.resultados?.e2000);
				sheet.cell("X22").value(data.resultados?.e1000);
				sheet.cell("W22").value(data.resultados?.e500);
				sheet.cell("V22").value(data.resultados?.e250);

				for (let i = 47, a = 0; i <= 52; i++, a++) {
					const arr = data.resultados?.obs.split("<br>") as string[];
					const str = arr[a];
					if (str) sheet.cell(`E${i}`).value(str);
				}

				return await workbook.outputAsync();
			} catch (error) {
				console.error("❌ Erro ao atualizar a planilha:", error);
				return undefined;
			}
		}
	}
}
