import axios from "axios";
import { createContext, useContext, useState } from "react";

export interface PessoaType {
	id: string;
	nome: string;
	cpf: string;
	dataNascimento: string;
	dataExame: string;
	tipoExame: string;
	funcao: string;
	empresa: string;
	responsavel: string;
	resultados: ResultadoType | undefined;
}

export interface ResultadoType {
	od: string;
	d250: string;
	d500: string;
	d1000: string;
	d2000: string;
	d3000: string;
	d4000: string;
	d6000: string;
	d8000: string;
	dcera: string;
	oe: string;
	e250: string;
	e500: string;
	e1000: string;
	e2000: string;
	e3000: string;
	e4000: string;
	e6000: string;
	e8000: string;
	ecera: string;
	obs: string;
}

export interface PessoaProps {
	pessoa: PessoaType | undefined;
	set: (pessoa: PessoaType | undefined) => void;
	get: (id?: string) => Promise<PessoaType | PessoaType[] | undefined>;
	create: (pessoa: PessoaType) => Promise<boolean>;
	update: (pessoa: PessoaType) => Promise<boolean>;
	delete: (id: string) => Promise<boolean>;
	download: (id: string, type: "resultado" | "requisicao") => Promise<void>;
}

const PessoaContext = createContext<PessoaProps | undefined>(undefined);

export default function PessoaProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const api_url = "http://localhost:48732";
	const [pessoa, setPessoa] = useState<PessoaType | undefined>(undefined);

	async function get(id?: string) {
		const result = await axios.get(
			`${api_url}/pessoa/get${id ? `?id=${id}` : ""}`
		);
		return result.data;
	}

	async function create(data: PessoaType) {
		const result = await axios.post(`${api_url}/pessoa/create`, data);
		return result.status === 201;
	}

	async function update(data: PessoaType) {
		const result = await axios.put(`${api_url}/pessoa/update`, data);
		return result.status === 201;
	}

	async function deletePessoa(id: string) {
		const result = await axios.delete(`${api_url}/pessoa/delete?id=${id}`);
		return result.status === 201;
	}

	async function download(id: string, type: "resultado" | "requisicao") {
		try {
			const response = await axios.get(
				`${api_url}/pessoa/download?id=${id}&type=${type}`,
				{
					responseType: "blob",
				}
			);

			console.log("📄 Blob recebido:", response.data);

			const blob = new Blob([response.data], {
				type: response.data.type,
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");

			link.href = url;
			link.download = `${type} - ${id}.${
				type === "requisicao" ? "xlsx" : "xlsm"
			}`;
			document.body.appendChild(link);
			link.click();

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
				delete: deletePessoa,
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
