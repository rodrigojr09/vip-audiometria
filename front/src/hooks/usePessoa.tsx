import type { Pessoa } from "@prisma/client";
import { createContext, useContext, useState } from "react";
import api from "@/lib/api";

export interface PessoaProps {
	pessoas: Pessoa[];
	obterPessoa: (id?: string) => Promise<Pessoa | Pessoa[] | undefined>;
	create: (pessoa: Pessoa) => Promise<Pessoa | false>;
	update: (pessoa: Pessoa) => Promise<boolean>;
	removerPessoa: (id: string) => Promise<boolean>;
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
		const result = await api.get("/pessoas/get");
		setPessoas(result.data);
	}

	async function obterPessoa(id?: string) {
		const result = await api.get(`/pessoas/get${id ? `?id=${id}` : ""}`);
		return result.data;
	}

	async function create(data: Pessoa) {
		const result = await api.post(`/pessoas/create`, data);
		refresh();
		return result.status === 201 ? (result.data as Pessoa) : false;
	}

	async function update(data: Pessoa) {
		const result = await api.put(`/pessoas/update`, data);
		refresh();
		return result.status === 201;
	}

	async function removerPessoa(id: string) {
		const result = await api.delete(`/pessoas/delete?id=${id}`);
		refresh();
		return result.status === 201;
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
