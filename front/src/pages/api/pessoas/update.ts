import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "PUT") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	try {
		const { id, nome, cpf, dataNascimento } = req.body as {
			id?: string;
			nome?: string;
			cpf?: string;
			dataNascimento?: string;
		};

		if (!id) return res.status(400).json({ error: "Missing id" });
		if (!nome) return res.status(400).json({ error: "Missing nome" });
		if (!cpf) return res.status(400).json({ error: "Missing cpf" });
		if (!dataNascimento)
			return res.status(400).json({ error: "Missing dataNascimento" });

		const pessoa = await prisma.pessoa.update({
			where: { id },
			data: { nome, cpf, dataNascimento },
		});

		res.status(201).json(pessoa);
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
}

