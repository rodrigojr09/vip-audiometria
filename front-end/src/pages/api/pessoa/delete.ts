import data from "@/lib/DataProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query as { id: string | undefined };
    if(!id) return res.status(400).json({ error: "ID não fornecido" });
    const pessoa = await data.deleteData(id);
    res.status(201).json(pessoa);
}
