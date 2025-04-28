import { Pessoa } from "../../prisma/client";
import data from "../data/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../lib/Logger"; // Importando a lib de logging

export default async function handler(req: FastifyRequest, res: FastifyReply) {
	const pessoa = req.body as Pessoa;

	try {
		logger.info(
			`Iniciando criação de pessoa: ${pessoa.nome}, CPF: ${pessoa.cpf}`
		);

		const createdPessoa = await data.createData(pessoa);

		logger.info(
			`Pessoa criada com sucesso: ${createdPessoa.nome}, ID: ${createdPessoa.id}`
		);
		res.status(201).send(createdPessoa);
	} catch (error: any) {
		logger.error(`Erro ao criar pessoa: ${error.message}`);
		res.status(500).send({ error: "Erro interno ao criar pessoa" });
	}
}
