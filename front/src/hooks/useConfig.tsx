import api from "@/lib/api";
import { Medica } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { usePessoa } from "./usePessoa";

interface Config {
	medicas: Medica[];
	calibracao: string;
	reload: () => Promise<void>;
    removerMedica: (id: string) => Promise<void>;
    criarMedica: (data: Medica) => Promise<void>;
	change: (key: string, value: string) => Promise<void>;
}

const ConfigContext = createContext<Config | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<boolean>(false);
	const [medicas, setMedicas] = useState<Medica[]>([]);
	const pessoas = usePessoa();
	const [calibracao, setCalibracao] = useState<string>("");

	async function reload() {
		try {
			setState(true);
			const result = await api.get("/config/get");
			if (result.status !== 200)
				return alert("Erro ao carregar configurações!");
			setMedicas(result.data.medicas);
			setCalibracao(result.data.calibracao);
			await pessoas.refresh();
			setState(false);
		} catch (e) {
			console.log(e);
			alert("Erro ao carregar configurações!");
		}
	}

	async function change(key: string, value: string) {
		setState(true);
		const result = await api.put(`/config/update?key=${key}&value=${value}`);
		if (result.status !== 200) return alert("Erro ao atualizar configurações!");
		setState(false);
	}

    async function removerMedica(id: string) {
        setState(true);
        const result = await api.delete(`/config/medicas/delete?id=${id}`);
        if (result.status !== 200) return alert("Erro ao remover configurações!");
        setState(false);
    }

    async function criarMedica(data: Medica) {
        setState(true);
        const result = await api.post(`/config/medicas/create`, data);
        if (result.status !== 200) return alert("Erro ao criar configurações!");
        setState(false);
    }

	// biome-ignore lint/correctness/useExhaustiveDependencies: off
	useEffect(() => {
		(async () => {
			await reload();
		})();
	}, []);

	if (state)
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<p className="text-white font-bold text-3xl">
					Carregando configurações...
				</p>
			</div>
		);

	return (
		<ConfigContext.Provider value={{ medicas, calibracao, reload, change, removerMedica, criarMedica }}>
			{children}
		</ConfigContext.Provider>
	);
}

export function useConfig() {
	const context = useContext(ConfigContext);
	if (context === undefined) {
		throw new Error("useConfig must be used within a ConfigProvider");
	}
	return context;
}
