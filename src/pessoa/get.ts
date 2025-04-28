import data from "../data/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../lib/Logger"; // Importando a lib de logging

export default async function handler(req: FastifyRequest, res: FastifyReply) {
	const { id } = req.query as { id: string | undefined };
	if (id) {
		logger.info(`Iniciando busca para o ID: ${id}`);

		try {
			const pessoa = await data.getData(id);

			if (!pessoa) {
				logger.warn(`Pessoa com ID ${id} não encontrada.`);
				return res.status(404).send({ error: "Pessoa não encontrada" });
			}

			logger.info(
				`Pessoa com ID ${id} encontrada: ${JSON.stringify(pessoa)}`
			);

			return res.status(200).send(pessoa);
		} catch (err: any) {
			logger.error(
				`Erro durante a busca para o ID ${id}: ${err.message}`
			);
			console.log(err);
			return res.status(500).send({ error: "Erro interno no servidor" });
		}
	} else {
		logger.info(`Iniciando busca para todos os IDs`);

		try {
			const pessoas = await data.getData();

			if (!pessoas || !Array.isArray(pessoas)) {
				logger.warn(`Pessoas não encontradas.`);
				return res
					.status(404)
					.send({ error: "Pessoas não encontradas" });
			}

			logger.info(`Quantidade de Pessoas encontradas: ${pessoas.length}`);

			return res.status(200).send(pessoas);
		} catch (err: any) {
			logger.error(`Erro durante a busca por todos: ${err.message}`);
			console.log(err);
			return res.status(500).send({ error: "Erro interno no servidor" });
		}
	}
}
