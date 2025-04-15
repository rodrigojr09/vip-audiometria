import data from "@/lib/DataProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query as { id: string | undefined };
	const pessoa = await data.getData(id);
	res.status(200).json(pessoa);
}
