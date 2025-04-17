import getRequisicao from "./get-requisicao";
import { getResultadoFile } from "./get-resultado";
import prisma from ".//prisma";
import { Pessoa } from "@prisma/client";

class DataProvider {
	async getData(id?: string): Promise<Pessoa | Pessoa[] | null> {
		if (id) {
			const pessoa = await prisma.pessoa.findUnique({ where: { id } });
			return pessoa;
		} else {
			const pessoas = await prisma.pessoa.findMany();
			return pessoas;
		}
	}

	async createData(data: Pessoa) {
		const newPessoa = await prisma.pessoa.create({ data });
		return newPessoa;
	}

	async updateData({ id, ...data }: Pessoa) {
		const updatedPessoa = await prisma.pessoa.update({
			where: { id },
			data,
		});
		return updatedPessoa;
	}

	async deleteData(id: string) {
		const deletedPessoa = await prisma.pessoa.delete({ where: { id } });
		return deletedPessoa;
	}

	async downloadData(id: string, type: "resultado" | "requisicao") {
		const data = (await this.getData(id)) as Pessoa;
		if (!data) return undefined;
		
		if (type == "resultado") {
			const doc = await getResultadoFile(data);
			return doc;
		} else {
			const doc = await getRequisicao(data);
			return doc;
		}
	}
}

const data = new DataProvider();
export default data;
