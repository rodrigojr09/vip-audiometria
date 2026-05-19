import type { Pessoa } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { usePessoa } from "@/hooks/usePessoa";

export default function PessoasPage() {
	const router = useRouter();
	const { pessoas, refresh, removerPessoa } = usePessoa();
	const [search, setSearch] = useState("");

	useEffect(() => {
		refresh();
	}, []);

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return pessoas;
		return pessoas.filter(
			(p) =>
				p.nome.toLowerCase().includes(q) ||
				p.cpf.replaceAll(".", "").replaceAll("-", "").includes(q.replaceAll(".", "").replaceAll("-", "")),
		);
	}, [pessoas, search]);

	async function handleDelete(pessoa: Pessoa) {
		const ok = confirm(`Remover pessoa "${pessoa.nome}"?`);
		if (!ok) return;
		const status = await removerPessoa(pessoa.id);
		if (!status) alert("Erro ao remover pessoa!");
	}

	return (
		<div className="bg-gray-900 min-h-screen w-full p-6 text-white">
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Pessoas</h1>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => router.push("/pessoas/novo")}
						className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
					>
						Nova Pessoa
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
					placeholder="Pesquisar por nome ou CPF"
					className="w-full rounded bg-gray-900 border border-gray-700 p-2"
				/>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full border border-gray-700 rounded">
					<thead className="bg-gray-800">
						<tr>
							<th className="p-2 text-left">Nome</th>
							<th className="p-2 text-left">CPF</th>
							<th className="p-2 w-28 text-right">Exames</th>
							<th className="p-2 w-64 text-right"></th>
						</tr>
					</thead>
					<tbody>
						{filtered.map((pessoa) => (
							<tr key={pessoa.id} className="border-t border-gray-700">
								<td className="p-2">{pessoa.nome}</td>
								<td className="p-2">{pessoa.cpf}</td>
								<td className="p-2 text-right">{(pessoa as any).exames?.length || 0}</td>
								<td className="p-2">
									<div className="flex justify-end gap-3">
										<button
											type="button"
											onClick={() => router.push(`/pessoas/${pessoa.id}`)}
											className="text-blue-300 hover:text-blue-400"
										>
											Abrir
										</button>
										<button
											type="button"
											onClick={() => router.push(`/pessoas/${pessoa.id}/editar`)}
											className="text-yellow-300 hover:text-yellow-400"
										>
											Editar
										</button>
										<button
											type="button"
											onClick={() => handleDelete(pessoa)}
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
								<td className="p-4 text-gray-400" colSpan={4}>
									Nenhuma pessoa encontrada.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

