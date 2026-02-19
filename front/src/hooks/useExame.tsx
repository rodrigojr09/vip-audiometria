import type { Exame, Prisma } from "@prisma/client";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import api from "@/lib/api";

export interface ExameProps {
	exames: Prisma.ExameGetPayload<{ include: { pessoa: true } }>[];
	obterExame: (id?: string) => Promise<Exame | Exame[] | undefined>;
	create: (exame: Exame) => Promise<boolean>;
	update: (exame: Exame) => Promise<boolean>;
	removerExame: (id: string) => Promise<boolean>;
	download: (id: string, calibracao: string, requisicao?: boolean) => Promise<void>;
	refresh: () => Promise<void>;
}

const ExameContext = createContext<ExameProps | undefined>(undefined);

export default function ExameProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [exames, setExames] = useState<ExameProps["exames"]>([]);

	async function refresh() {
		const result = await api.get("/exames/get");
		setExames(result.data);
	}

	async function obterExame(id?: string) {
		const result = await api.get(`/exames/get${id ? `?id=${id}` : ""}`);
		return result.data;
	}

	async function create(data: Exame) {
		const result = await api.post("/exames/create", data);
		refresh();
		return result.status === 201;
	}

	async function update(data: Exame) {
		const result = await api.put("/exames/update", data);
		refresh();
		return result.status === 201;
	}

	async function removerExame(id: string) {
		const result = await api.delete(`/exames/delete?id=${id}`);
		refresh();
		return result.status === 200;
	}

	async function download(id: string, calibracao: string,requisicao?:boolean) {
		try {
			const exame = await obterExame(id);

			const response = await axios.post(
				requisicao ? "http://localhost:7961/download-requisicao" : "http://localhost:7961/download",
				{
					...exame,
					calibracao,
				},
				{
					responseType: "blob", // 👈 ESSENCIAL
				},
			);

			const blob = new Blob([response.data], {
				type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			});

			const url = window.URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = url;
			a.download = `${requisicao ? "Requisicao" : "Resultado"} - ${exame.pessoa?.nome}.docx`;
			document.body.appendChild(a);
			a.click();

			a.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("❌ Erro ao baixar o exame:", error);
		}
    }


	return (
		<ExameContext.Provider
			value={{
				exames,
				obterExame,
				create,
				update,
				removerExame,
				refresh,
				download,
			}}
		>
			{children}
		</ExameContext.Provider>
	);
}

export function useExame() {
	const context = useContext(ExameContext);
	if (context === undefined) {
		throw new Error("useExame must be used within an ExameProvider");
	}
	return context;
}
