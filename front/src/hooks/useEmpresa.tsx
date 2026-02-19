import type { Empresa } from "@prisma/client";
import { createContext, useContext, useState } from "react";
import api from "@/lib/api";

export interface EmpresaProps {
	empresas: Empresa[];
	obterEmpresa: (id?: string) => Promise<Empresa | Empresa[] | undefined>;
	create: (empresa: Empresa) => Promise<Empresa | false>;
	update: (empresa: Empresa) => Promise<boolean>;
	removerEmpresa: (id: string) => Promise<boolean>;
	refresh: () => Promise<void>;
}

const EmpresaContext = createContext<EmpresaProps | undefined>(undefined);

export default function EmpresaProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [empresas, setEmpresas] = useState<Empresa[]>([]);

	async function refresh() {
		const result = await api.get("/empresas/get");
		setEmpresas(result.data);
	}

	async function obterEmpresa(id?: string) {
		const result = await api.get(`/empresas/get${id ? `?id=${id}` : ""}`);
		return result.data;
	}

	async function create(data: Empresa) {
		const result = await api.post(`/empresas/create`, data);
		refresh();
		return result.status === 201 ? result.data : false;
	}

	async function update(data: Empresa) {
		const result = await api.put(`/empresas/update`, data);
		refresh();
		return result.status === 201;
	}

	async function removerEmpresa(id: string) {
		const result = await api.delete(`/empresas/delete?id=${id}`);
		refresh();
		return result.status === 201;
	}

	return (
		<EmpresaContext.Provider
			value={{
				obterEmpresa,
				create,
				update,
				empresas,
				removerEmpresa,
				refresh,
			}}
		>
			{children}
		</EmpresaContext.Provider>
	);
}

export function useEmpresa() {
	const context = useContext(EmpresaContext);
	if (context === undefined) {
		throw new Error("useEmpresa must be used within a EmpresaProvider");
	}
	return context;
}
