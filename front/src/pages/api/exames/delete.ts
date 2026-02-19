import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query as { id: string };

    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const exame = await prisma.exame.delete({ where: { id } });

        return res.status(200).json(exame);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
