import data from "@/data/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";
import { Pessoa } from "../../prisma/client";
import { logger } from "../lib/Logger"; // Importando a lib de logging

export default async function handler(req: FastifyRequest, res: FastifyReply) {
	const pessoa = req.body as Pessoa;

	if (!pessoa.id) {
		logger.warn("ID não fornecido para atualização.");
		return res.status(400).send({ error: "ID não fornecido" });
	}

	logger.info(`Iniciando atualização para o ID: ${pessoa.id}`);

	try {
		const updatedPessoa = await data.updateData(pessoa);

		if (!updatedPessoa) {
			logger.warn(
				`Pessoa com ID ${pessoa.id} não encontrada para atualização.`
			);
			return res.status(404).send({ error: "Pessoa não encontrada" });
		}

		logger.info(
			`Pessoa com ID ${
				pessoa.id
			} atualizada com sucesso: ${JSON.stringify(updatedPessoa)}`
		);

		return res.status(201).send(updatedPessoa);
	} catch (err: any) {
		logger.error(
			`Erro ao atualizar pessoa com ID ${pessoa.id}: ${err.message}`
		);
		console.log(err);
		return res.status(500).send({ error: "Erro interno no servidor" });
	}
}
