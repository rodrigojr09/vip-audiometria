import axios from "axios";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export async function getDocx(url: string) {
	try {
		// Baixa o arquivo como arraybuffer (binário)
		const response = await axios.get(url, {
			responseType: "arraybuffer",
		});

		// Cria o zip com pizzip
		const zip = new PizZip(response.data);

		// Cria o docxtemplater pronto pra editar
		const doc = new Docxtemplater(zip, {
			paragraphLoop: true,
			linebreaks: true,
		});

		return doc;
	} catch (error) {
		console.error("Erro ao baixar ou processar o DOCX:", error);
		throw error;
	}
}
