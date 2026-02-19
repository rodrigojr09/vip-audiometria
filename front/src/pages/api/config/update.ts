import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { key, value } = req.query as { key: string; value: string };
        await prisma.config.update({
            where: { key },
            data: { value },
        });
        res.status(200).json({ message: "Configurações atualizadas com sucesso" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}