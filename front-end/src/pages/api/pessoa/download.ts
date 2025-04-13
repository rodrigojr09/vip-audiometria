import data from "@/lib/DataProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    try {
        const { id } = req.query as { id: string | undefined };
        if (!id) return res.status(400).json({ error: "ID não fornecido" });
        res.send(await data.downloadData(id, "resultado"));
    } catch (err) {
        console.log(err)
    }
}
