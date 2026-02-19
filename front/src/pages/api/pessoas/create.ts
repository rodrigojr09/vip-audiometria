// api/pessoas/create

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }
    
    try {
        const { nome, cpf, dataNascimento } = req.body;

        const pessoa = await prisma.pessoa.create({
            data: {
                nome,
                cpf,
                dataNascimento,
            },
        });
    
        res.status(201).json(pessoa);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}