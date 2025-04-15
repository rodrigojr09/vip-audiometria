import data from "@/lib/DataProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { id, type } = req.query as {
			id: string | undefined;
			type?: "resultado" | "requisicao";
		};
		if (!id) return res.status(400).json({ error: "ID não fornecido" });
		if (!type) return res.status(400).json({ error: "Tipo não fornecido" });
		const buffer = await data.downloadData(id, type);
		if (!buffer)
			return res.status(400).json({ error: "Arquivo não encontrado" });
		const filename = `${type.toUpperCase()} - ${id}.pdf`; // ou qualquer nome que quiser

		const formData = new FormData();
		formData.append("file", new Blob([buffer]), filename);

		const response = await fetch("/upload", {
			method: "POST",
			body: formData,
		});

		const result = await response.json();
		console.log(result);
	} catch (err) {
		console.log(err);
	}
}
