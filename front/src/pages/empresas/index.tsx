import type { Empresa } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useEmpresa } from "@/hooks/useEmpresa";

export default function EmpresasPage() {
	const router = useRouter();
	const { empresas, refresh, removerEmpresa } = useEmpresa();
	const [search, setSearch] = useState("");

	useEffect(() => {
		refresh();
	}, []);

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return empresas;
		return empresas.filter((e) => e.nome.toLowerCase().includes(q));
	}, [empresas, search]);

	async function handleDelete(empresa: Empresa) {
		const ok = confirm(`Remover empresa "${empresa.nome}"?`);
		if (!ok) return;
		const status = await removerEmpresa(empresa.id);
		if (!status) alert("Erro ao remover empresa!");
	}

	return (
		<div className="bg-gray-900 min-h-screen w-full p-6 text-white">
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Empresas</h1>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => router.push("/empresas/novo")}
						className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
					>
						Nova Empresa
					</button>
					<button
						type="button"
						onClick={() => router.back()}
						className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
					>
						Voltar
					</button>
				</div>
			</header>

			<div className="mb-4">
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Pesquisar por nome"
					className="w-full rounded bg-gray-900 border border-gray-700 p-2"
				/>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full border border-gray-700 rounded">
					<thead className="bg-gray-800">
						<tr>
							<th className="p-2 text-left">Nome</th>
							<th className="p-2 w-28 text-right">Exames</th>
							<th className="p-2 w-64 text-right"></th>
						</tr>
					</thead>
					<tbody>
						{filtered.map((empresa) => (
							<tr key={empresa.id} className="border-t border-gray-700">
								<td className="p-2">{empresa.nome}</td>
								<td className="p-2 text-right">{(empresa as any).exames?.length || 0}</td>
								<td className="p-2">
									<div className="flex justify-end gap-3">
										<button
											type="button"
											onClick={() => router.push(`/empresas/${empresa.id}`)}
											className="text-blue-300 hover:text-blue-400"
										>
											Abrir
										</button>
										<button
											type="button"
											onClick={() => router.push(`/empresas/${empresa.id}/editar`)}
											className="text-yellow-300 hover:text-yellow-400"
										>
											Editar
										</button>
										<button
											type="button"
											onClick={() => handleDelete(empresa)}
											className="text-red-400 hover:text-red-500"
										>
											Remover
										</button>
									</div>
								</td>
							</tr>
						))}

						{filtered.length === 0 && (
							<tr className="border-t border-gray-700">
								<td className="p-4 text-gray-400" colSpan={3}>
									Nenhuma empresa encontrada.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

