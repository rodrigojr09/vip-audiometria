// api/exames/create

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "PUT") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const { id, empresa,pessoa, ...data } = req.body;

        const exame = await prisma.exame.update({
            where: {
                id
            },
            data
        });

        res.status(201).json(exame);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}