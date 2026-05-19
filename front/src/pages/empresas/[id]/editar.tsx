import type { Empresa } from "@prisma/client";
import { useRouter } from "next/router";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import Input from "@/components/Input";
import { useEmpresa } from "@/hooks/useEmpresa";
import Loading from "@/pages/loading";

export default function EditarEmpresaPage() {
	const router = useRouter();
	const { obterEmpresa, update } = useEmpresa();
	const [empresa, setEmpresa] = useState<Empresa | undefined>(undefined);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!router.query.id) return;
		(async () => {
			const result = (await obterEmpresa(router.query.id as string)) as
				| Empresa
				| undefined;
			setEmpresa(result);
		})();
	}, [router.query.id]);

	function handleChange(
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) {
		const { name, value } = e.target;
		setEmpresa((prev) => (prev ? ({ ...prev, [name]: value } as Empresa) : prev));
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (!empresa) return;
		try {
			setLoading(true);
			const status = await update(empresa);
			if (!status) return alert("Erro ao salvar empresa!");
			alert("Empresa salva com sucesso!");
			router.push(`/empresas/${empresa.id}`);
		} finally {
			setLoading(false);
		}
	}

	if (!empresa)
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loading />
			</div>
		);

	return (
		<form onSubmit={handleSubmit} className="bg-gray-900 min-h-screen w-full p-6 text-white">
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Editar Empresa</h1>
				<button
					type="button"
					onClick={() => router.back()}
					className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
				>
					Voltar
				</button>
			</header>

			<div className="max-w-xl">
				<Input label="Nome" name="nome" value={empresa.nome} onChange={handleChange} />

				<div className="flex gap-4 mt-6">
					<button
						type="submit"
						disabled={loading}
						className="bg-green-600 hover:bg-green-700 w-full p-3 rounded font-semibold disabled:opacity-50"
					>
						Salvar
					</button>
					<button
						type="button"
						onClick={() => router.push(`/empresas/${empresa.id}`)}
						className="bg-gray-700 hover:bg-gray-600 w-full p-3 rounded font-semibold"
					>
						Cancelar
					</button>
				</div>
			</div>
		</form>
	);
}
