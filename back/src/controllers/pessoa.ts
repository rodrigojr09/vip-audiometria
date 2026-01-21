import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { app, shell } from "electron";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { Pessoa } from "../../prisma/client";
import pessoas from "../data/Pessoas";
import { logger } from "../lib/Logger";

async function update(req: FastifyRequest, res: FastifyReply) {
	const pessoa = req.body as Pessoa;

	if (!pessoa.id) {
		logger.warn("ID não fornecido para atualização.");
		return res.status(400).send({ error: "ID não fornecido" });
	}

	logger.info(`Iniciando atualização para o ID: ${pessoa.id}`);

	try {
		const updatedPessoa = await pessoas.update(pessoa);

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

async function get(req: FastifyRequest, res: FastifyReply) {
	const { id } = req.query as { id: string | undefined };
	if (id) {
		logger.info(`Iniciando busca para o ID: ${id}`);

		try {
			const pessoa = await pessoas.get(id);

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
			const data = await pessoas.get();

			if (!data || !Array.isArray(data)) {
				logger.warn(`Pessoas não encontradas.`);
				return res
					.status(404)
					.send({ error: "Pessoas não encontradas" });
			}

			logger.info(`Quantidade de Pessoas encontradas: ${data.length}`);

			return res.status(200).send(data);
		} catch (err: any) {
			logger.error(`Erro durante a busca por todos: ${err.message}`);
			console.log(err);
			return res.status(500).send({ error: "Erro interno no servidor" });
		}
	}
}

async function download(req: FastifyRequest, res: FastifyReply) {
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

		const buffer = await pessoas.download(id, type);
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

async function remove(req: FastifyRequest, res: FastifyReply) {
	const { id } = req.query as { id: string | undefined };

	if (!id) {
		logger.warn("Tentativa de exclusão sem ID fornecido");
		return res.status(400).send({ error: "ID não fornecido" });
	}

	try {
		logger.info(`Iniciando exclusão de pessoa com ID: ${id}`);
		const pessoa = await pessoas.delete(id);

		logger.info(
			`Pessoa excluída com sucesso: ${pessoa.nome}, ID: ${pessoa.id}`
		);
		res.status(201).send(pessoa);
	} catch (error: any) {
		logger.error(`Erro ao excluir pessoa com ID ${id}: ${error.message}`);
		res.status(500).send({ error: "Erro interno ao excluir pessoa" });
	}
}

async function create(req: FastifyRequest, res: FastifyReply) {
	const pessoa = req.body as Pessoa;

	try {
		logger.info(
			`Iniciando criação de pessoa: ${pessoa.nome}, CPF: ${pessoa.cpf}`
		);

		const createdPessoa = await pessoas.create(pessoa);

		logger.info(
			`Pessoa criada com sucesso: ${createdPessoa.nome}, ID: ${createdPessoa.id}`
		);
		res.status(201).send(createdPessoa);
	} catch (error: any) {
		logger.error(`Erro ao criar pessoa: ${error.message}`);
		res.status(500).send({ error: "Erro interno ao criar pessoa" });
	}
}

export { create, download, get, remove, update };

