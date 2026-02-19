import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { nome, documento } = req.body;

        const medica = await prisma.medica.create({
            data: {
                nome,
                documento,
            },
        });

        res.status(201).json(medica);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}