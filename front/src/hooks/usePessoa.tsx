import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import type { Pessoa } from "@/types";

export interface PessoaProps {
	pessoas: Pessoa[];
	obterPessoa: (id?: string) => Promise<Pessoa | Pessoa[] | undefined>;
	create: (pessoa: Pessoa) => Promise<boolean>;
	update: (pessoa: Pessoa) => Promise<boolean>;
	removerPessoa: (id: string) => Promise<boolean>;
	download: (id: string, type: "resultado" | "requisicao") => Promise<void>;
	refresh: () => Promise<void>;
}

const PessoaContext = createContext<PessoaProps | undefined>(undefined);

export default function PessoaProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [pessoas, setPessoas] = useState<Pessoa[]>([]);

	async function refresh() {
		const result = await api.get("/pessoa/get");
		setPessoas(result.data);
	}

	async function obterPessoa(id?: string) {
		const result = await api.get(`/pessoa/get${id ? `?id=${id}` : ""}`);
		return result.data;
	}

	async function create(data: Pessoa) {
		const result = await api.post(`/pessoa/create`, data);
		return result.status === 201;
	}

	async function update(data: Pessoa) {
		const result = await api.put(`/pessoa/update`, data);
		return result.status === 201;
	}

	async function removerPessoa(id: string) {
		const result = await api.delete(`/pessoa/delete?id=${id}`);
		return result.status === 201;
	}

	async function download(id: string, type: "resultado" | "requisicao") {
		try {
			const response = await api.get(`/pessoa/download?id=${id}&type=${type}`);
			console.log(response.status);
			console.log("✅ Download concluído!");
		} catch (error) {
			console.error("❌ Erro ao baixar o arquivo:", error);
		}
	}

	return (
		<PessoaContext.Provider
			value={{
				obterPessoa,
				create,
				update,
				pessoas,
				removerPessoa,
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
