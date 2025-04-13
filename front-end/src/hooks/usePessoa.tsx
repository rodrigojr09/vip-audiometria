import { Pessoa } from "@prisma/client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export interface PessoaProps {
	pessoa: Pessoa | undefined;
	pessoas: Pessoa[];
	set: (pessoa: Pessoa | undefined) => void;
	get: (id?: string) => Promise<Pessoa | Pessoa[] | undefined>;
	create: (pessoa: Pessoa) => Promise<boolean>;
	update: (pessoa: Pessoa) => Promise<boolean>;
	delete: (id: string) => Promise<boolean>;
	download: (id: string, type: "resultado" | "requisicao") => Promise<void>;
	refresh: () => Promise<void>;
}

const PessoaContext = createContext<PessoaProps | undefined>(undefined);

export default function PessoaProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [pessoa, setPessoa] = useState<Pessoa | undefined>(undefined);
	const [pessoas, setPessoas] = useState<Pessoa[]>([]);

	useEffect(() => {
		refresh();
	}, []);

	async function refresh() {
		const result = await axios.get("/api/pessoa/get");
		setPessoas(result.data);
	}
	async function get(id?: string) {
		const result = await axios.get(
			`/api/pessoa/get${id ? `?id=${id}` : ""}`
		);
		return result.data;
	}

	async function create(data: Pessoa) {
		const result = await axios.post(`/api/pessoa/create`, data);
		return result.status === 201;
	}

	async function update(data: Pessoa) {
		const result = await axios.put(`/api/pessoa/update`, data);
		return result.status === 201;
	}

	async function deletePessoa(id: string) {
		const result = await axios.delete(`/api/pessoa/delete?id=${id}`);
		return result.status === 201;
	}

	async function download(id: string, type: "resultado" | "requisicao") {
		try {
			const response = await axios.get(
				`/api/pessoa/download?id=${id}&type=${type}`,
				{
					responseType: "blob",
				}
			);

			console.log("📄 Blob recebido:", response.data);

			// Criar um blob a partir da resposta
			const blob = new Blob([response.data], {
				type: response.data.type,
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");

			// Nome do arquivo
			const fileName = `${type.toUpperCase()} - ${pessoa?.nome}.docx`;

			// Configurar o link para download
			link.href = url;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();

			// Revogar a URL após o download
			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);

			console.log("✅ Download concluído!");
		} catch (error) {
			console.error("❌ Erro ao baixar o arquivo:", error);
		}
	}

	return (
		<PessoaContext.Provider
			value={{
				pessoa,
				set: setPessoa,
				get,
				create,
				update,
				pessoas,
				delete: deletePessoa,
				refresh,
				download,
			}}
		>
			{children}
		</PessoaContext.Provider>
	);
}

export function usePessoa() {
	const context = useContext(PessoaContext);
	if (context === undefined) {
		throw new Error("usePessoa must be used within a PessoaProvider");
	}
	return context;
}
