import { Pessoa } from "@/types";
import Axios from "axios";
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
	refresh: () => void;
}

const PessoaContext = createContext<PessoaProps | undefined>(undefined);

export default function PessoaProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const axios = Axios.create({
		withCredentials: true,
		baseURL: "http://localhost:7961",
	});
	const [pessoa, setPessoa] = useState<Pessoa | undefined>(undefined);
	const [pessoas, setPessoas] = useState<Pessoa[]>([]);


	async function refresh() {
		const result = await axios.get("/pessoa/get");
		setPessoas(result.data);
	}

	useEffect(() => {
		(async () => {
			const result = await axios.get("/pessoa/get");
			setPessoas(result.data);
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function get(id?: string) {
		const result = await axios.get(`/pessoa/get${id ? `?id=${id}` : ""}`);
		return result.data;
	}

	async function create(data: Pessoa) {
		const result = await axios.post(`/pessoa/create`, data);
		return result.status === 201;
	}

	async function update(data: Pessoa) {
		const result = await axios.put(`/pessoa/update`, data);
		return result.status === 201;
	}

	async function deletePessoa(id: string) {
		const result = await axios.delete(`/pessoa/delete?id=${id}`);
		return result.status === 201;
	}

	async function download(id: string, type: "resultado" | "requisicao") {
		try {
			const response = await axios.get(
				`/pessoa/download?id=${id}&type=${type}`
			);
			console.log(response.status);
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
