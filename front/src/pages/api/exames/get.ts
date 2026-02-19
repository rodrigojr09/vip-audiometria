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
            const exame = await prisma.exame.findFirst({
                where: { id },
                include: { pessoa: true, empresa: true },
            });

            return res.json(exame);
        } else {
            const exames = await prisma.exame.findMany({
                include: { pessoa: true, empresa: true },
            });
            return res.json(exames);
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
