import data from "@/lib/DataProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const pessoa = req.body;
    const updatedPessoa = await data.updateData(pessoa);
    res.status(201).json(updatedPessoa);
}