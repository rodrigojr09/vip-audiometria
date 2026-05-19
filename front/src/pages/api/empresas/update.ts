import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "PUT") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	try {
		const { id, nome } = req.body as { id?: string; nome?: string };
		if (!id) return res.status(400).json({ error: "Missing id" });
		if (!nome) return res.status(400).json({ error: "Missing nome" });

		const empresa = await prisma.empresa.update({
			where: { id },
			data: { nome },
		});

		res.status(201).json(empresa);
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
}

