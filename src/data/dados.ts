import { app } from "electron";
import path from "path";

export const dados = {
	medicas: [
		{
			nome: "Dra. Milena Zaia Miguel",
			documento: "CRFa 15158",
		},
		{
			nome: "Dra. Daniela Scarparo Naufel",
			documento: "CRFa 2/6 - 5902-0",
		},
	],
	paths: {
		logs: path.join(app.getPath("documents"), "VIP", "logs"),
		files: path.join(__dirname, "../../assets"),
	},
	getFile(fileName: string) {
		return path.join(this.paths.files, fileName);
	},
};
