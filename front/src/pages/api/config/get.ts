import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const medicas = await prisma.medica.findMany();
        const calibracao = await prisma.config.findFirst({
            where: { key: "calibracao" }
        });

        res.status(200).json({ medicas, calibracao: calibracao?.value || "" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}