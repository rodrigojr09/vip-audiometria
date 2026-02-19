import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const { id } = req.query as { id?: string };

        if (id) {
            const empresa = await prisma.empresa.findFirst({
                where: { id },
                include: { exames: true },
            });

            return res.json(empresa);
        } else {
            const empresas = await prisma.empresa.findMany({
                include: { exames: true },
            });
            return res.json(empresas);
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
