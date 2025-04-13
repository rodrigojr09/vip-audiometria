import data from "@/lib/DataProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
	const pessoa = req.body;
	const createdPessoa = await data.createData(pessoa);
	res.status(201).json(createdPessoa);
}
