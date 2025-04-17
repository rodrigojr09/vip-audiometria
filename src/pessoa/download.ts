import { app, shell } from "electron";
import data from "../lib/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export default async function handler(req: FastifyRequest, res: FastifyReply) {
	try {
		const { id, type } = req.query as {
			id: string | undefined;
			type?: "resultado" | "requisicao";
		};
		if (!id) return res.status(400).send({ error: "ID não fornecido" });
		if (!type) return res.status(400).send({ error: "Tipo não fornecido" });
		const buffer = await data.downloadData(id, type);
		if (!buffer)
			return res.status(400).send({ error: "Arquivo não encontrado" });
		const filename = `${type.toUpperCase()} - ${id}.docx`; // ou qualquer nome que quiser
		if (!existsSync(path.join(app.getPath("documents"), "VIP"))) mkdirSync(path.join(app.getPath("documents"), "VIP"));
		if(!existsSync(path.join(app.getPath("documents"), "VIP/Audiometria"))) mkdirSync(path.join(app.getPath("documents"), "VIP/Audiometria"));
		const filePath = path.join(
			app.getPath("documents"),
			"VIP/Audiometria",
			filename
		);
		writeFileSync(filePath, buffer);
		shell.openPath(filePath);
		return res.status(200).send({ message: "Arquivo enviado com sucesso" });
	} catch (err) {
		console.log(err);
	}
}
