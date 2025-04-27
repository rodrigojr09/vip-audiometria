import { app, shell } from "electron";
import data from "@/data/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { logger } from "../lib/Logger"; // Importando a lib de logging

export default async function handler(req: FastifyRequest, res: FastifyReply) {
	try {
		const { id, type } = req.query as {
			id: string | undefined;
			type?: "resultado" | "requisicao";
		};

		if (!id) {
			logger.warn("ID não fornecido para download.");
			return res.status(400).send({ error: "ID não fornecido" });
		}

		if (!type) {
			logger.warn("Tipo não fornecido para download.");
			return res.status(400).send({ error: "Tipo não fornecido" });
		}

		logger.info(`Iniciando download do tipo "${type}" para o ID: ${id}`);

		const buffer = await data.downloadData(id, type);
		if (!buffer) {
			logger.warn(
				`Arquivo não encontrado para o ID: ${id} e tipo: ${type}`
			);
			return res.status(400).send({ error: "Arquivo não encontrado" });
		}

		const filename = `${type.toUpperCase()} - ${id}.docx`; // ou qualquer nome que quiser
		const dirPath = path.join(
			app.getPath("documents"),
			"VIP",
			"Audiometria"
		);

		if (!existsSync(dirPath)) {
			logger.info(`Diretório "VIP/Audiometria" não existe. Criando...`);
			mkdirSync(dirPath, { recursive: true });
		}

		const filePath = path.join(dirPath, filename);
		writeFileSync(filePath, buffer);
		shell.openPath(filePath);

		logger.info(`Arquivo "${filename}" salvo com sucesso em: ${filePath}`);

		return res.status(200).send({ message: "Arquivo enviado com sucesso" });
	} catch (err: any) {
		logger.error(`Erro durante o download: ${err.message}`);
		console.log(err);
		return res.status(500).send({ error: "Erro interno no servidor" });
	}
}
