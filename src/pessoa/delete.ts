import data from "@/data/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../lib/Logger"; // Importando a lib de logging

export default async function handler(req: FastifyRequest, res: FastifyReply) {
	const { id } = req.query as { id: string | undefined };

	if (!id) {
		logger.warn("Tentativa de exclusão sem ID fornecido");
		return res.status(400).send({ error: "ID não fornecido" });
	}

	try {
		logger.info(`Iniciando exclusão de pessoa com ID: ${id}`);
		const pessoa = await data.deleteData(id);

		logger.info(
			`Pessoa excluída com sucesso: ${pessoa.nome}, ID: ${pessoa.id}`
		);
		res.status(201).send(pessoa);
	} catch (error: any) {
		logger.error(`Erro ao excluir pessoa com ID ${id}: ${error.message}`);
		res.status(500).send({ error: "Erro interno ao excluir pessoa" });
	}
}
