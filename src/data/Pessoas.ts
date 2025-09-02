import type { Pessoa } from "../../prisma/client";
import { logger } from "../lib/Logger";
import prisma from "../lib/prisma";
import getRequisicao from "./Requisicao";
import { getResultado } from "./Resultado";

class Pessoas {
	async get(id?: string): Promise<Pessoa | Pessoa[] | null> {
		try {
			if (id) {
				logger.info(`Buscando pessoa com ID: ${id}`);
				const pessoa = await prisma.pessoa.findUnique({
					where: { id },
				});
				return pessoa;
			} else {
				logger.info("Buscando todas as pessoas");
				const pessoas = await prisma.pessoa.findMany();
				return pessoas;
			}
		} catch (error: any) {
			logger.error(`Erro ao buscar dados: ${error.message}`);
			throw error;
		}
	}

	async create(data: Pessoa) {
		try {
			logger.info(`Criando nova pessoa: ${JSON.stringify(data)}`);
			const newPessoa = await prisma.pessoa.create({ data });
			return newPessoa;
		} catch (error: any) {
			logger.error(`Erro ao criar pessoa: ${error.message}`);
			throw error;
		}
	}

	async update({ id, ...data }: Pessoa) {
		try {
			logger.info(`Atualizando pessoa com ID: ${id}`);
			const updatedPessoa = await prisma.pessoa.update({
				where: { id },
				data,
			});
			return updatedPessoa;
		} catch (error: any) {
			logger.error(
				`Erro ao atualizar pessoa com ID ${id}: ${error.message}`
			);
			throw error;
		}
	}

	async delete(id: string) {
		try {
			logger.info(`Deletando pessoa com ID: ${id}`);
			const deletedPessoa = await prisma.pessoa.delete({ where: { id } });
			return deletedPessoa;
		} catch (error: any) {
			logger.error(
				`Erro ao deletar pessoa com ID ${id}: ${error.message}`
			);
			throw error;
		}
	}

	async download(id: string, type: "resultado" | "requisicao") {
		try {
			logger.info(`Baixando dados para pessoa ID ${id}, tipo: ${type}`);
			const data = (await this.get(id)) as Pessoa;
			if (!data) {
				logger.warn(`Pessoa com ID ${id} não encontrada`);
				return undefined;
			}

			if (type === "resultado") {
				const doc = await getResultado(data);
				logger.info(`Arquivo de resultado gerado para ID ${id}`);
				return doc;
			} else {
				const doc = await getRequisicao(data);
				logger.info(`Arquivo de requisição gerado para ID ${id}`);
				return doc;
			}
		} catch (error: any) {
			logger.error(`Erro ao baixar dados de ID ${id}: ${error.message}`);
			throw error;
		}
	}
}

const pessoas = new Pessoas();
export default pessoas;
