import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query as { id?: string };

	if (req.method !== "DELETE") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		if (!id) return res.status(400).json({ error: "Missing id" });
		const pessoa = await prisma.pessoa.delete({ where: { id } });
		return res.status(200).json(pessoa);
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
}

