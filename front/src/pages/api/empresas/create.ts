// api/empresas/create

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const { nome } = req.body;

        const empresa = await prisma.empresa.create({
            data: {
                nome,
            },
        });

        res.status(201).json(empresa);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}