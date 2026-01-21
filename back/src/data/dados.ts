import path from "node:path";
import { app } from "electron";

export const dados = {
	paths: {
		logs: path.join(app.getPath("documents"), "VIP", "logs"),
		files: path.join(__dirname, "../../assets"),
	},
	getFile(fileName: string) {
		return path.join(this.paths.files, fileName);
	},
};
