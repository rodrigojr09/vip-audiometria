import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const { id } = req.query as { id: string };
        const medica = await prisma.medica.delete({ where: { id } });
        res.status(200).json(medica);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}