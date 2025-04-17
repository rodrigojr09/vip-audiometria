import data from "../lib/DataProvider";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function handler(
	req: FastifyRequest,
	res: FastifyReply
) {
	const { id } = req.query as { id: string | undefined };
	const pessoa = await data.getData(id);
	res.status(200).send(pessoa);
}
