import data from "@/lib/DataProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    try {
        const { id,type } = req.query as { id: string | undefined, type?:"resultado" | "requisicao" };
        if (!id) return res.status(400).json({ error: "ID não fornecido" });
        if(!type) return res.status(400).json({ error: "Tipo não fornecido" });
        res.send(await data.downloadData(id, type));
    } catch (err) {
        console.log(err)
    }
}
