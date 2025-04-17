import { Pessoa } from "@prisma/client";
import data from "../lib/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function handler(req: FastifyRequest, res: FastifyReply) {
	const pessoa = req.body as Pessoa;
	const updatedPessoa = await data.updateData(pessoa);
	res.status(201).send(updatedPessoa);
}
