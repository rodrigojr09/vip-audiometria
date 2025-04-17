import { Pessoa } from "@prisma/client";
import data from "../lib/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function handler(
    req: FastifyRequest,
    res: FastifyReply
) {
	const pessoa = req.body as Pessoa;
	const createdPessoa = await data.createData(pessoa);
	res.status(201).send(createdPessoa);
}
