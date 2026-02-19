import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	try {
		const { id } = req.query as { id?: string };

		if (id) {
			const pessoa = await prisma.pessoa.findUnique({
				where: { id },
				include: { exames: true },
			});
			return res.json(pessoa);
		} else {
			const pessoas = await prisma.pessoa.findMany({
				include: { exames: true },
			});
			return res.json(pessoas);
		}
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
}
