import { app } from "electron";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

const path_data = `${app.getPath("documents")}/VIP-Audiometria`;

interface DataType {
	id: string;
	nome: string;
	cpf: string;
	dataNascimento: string;
	dataExame: string;
	tipoExame: string;
	funcao: string;
	empresa: string;
	responsavel: string;
}

export default class DataProvider {
	private getPath() {
		if (!existsSync(path_data)) mkdirSync(path_data);
		if (!existsSync(path_data + "/data.json"))
			writeFileSync(
				path_data + "/data.json",
				JSON.stringify({ version: "1.0.0", datas: [] })
			);
		return path_data + "/data.json";
	}

	constructor() {
		this.getPath();
	}

	async getData(id?: string) {
		const data = JSON.parse(readFileSync(this.getPath()).toString());
		return id ? data.datas.find((d: DataType) => d.id === id) : data.datas;
	}

	async createData(data: DataType) {
		const dataFile = JSON.parse(readFileSync(this.getPath()).toString());
		dataFile.datas.push(data);
		writeFileSync(this.getPath(), JSON.stringify(dataFile));
		return data;
	}

	async updateData(data: DataType) {
		const dataFile = JSON.parse(readFileSync(this.getPath()).toString());
		const datas = dataFile.datas.map((d: DataType) => {
			if (d.id === data.id) return data;
			return d;
		});
		writeFileSync(
			this.getPath(),
			JSON.stringify({ version: dataFile.version, datas })
		);
		return data;
	}

	async deleteData(id: string) {
		const dataFile = JSON.parse(readFileSync(this.getPath()).toString());
		const datas = dataFile.datas.filter((d: DataType) => d.id !== id);
		writeFileSync(
			this.getPath(),
			JSON.stringify({ version: dataFile.version, datas })
		);
		return id;
	}
}
