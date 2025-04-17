import data from "../lib/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function handler(req: FastifyRequest, res: FastifyReply) {
	const { id } = req.query as { id: string | undefined };
	if (!id) return res.status(400).send({ error: "ID não fornecido" });
	const pessoa = await data.deleteData(id);
	res.status(201).send(pessoa);
}
