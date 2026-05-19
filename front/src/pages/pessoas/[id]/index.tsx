import type { Exame, Pessoa } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePessoa } from "@/hooks/usePessoa";
import Loading from "@/pages/loading";
import moment from "@/lib/moment";

type PessoaWithExames = Pessoa & { exames?: Exame[] };

export default function PessoaDetalhePage() {
	const router = useRouter();
	const { obterPessoa, removerPessoa } = usePessoa();
	const [pessoa, setPessoa] = useState<PessoaWithExames | undefined>(undefined);

	useEffect(() => {
		if (!router.query.id) return;
		(async () => {
			const result = (await obterPessoa(router.query.id as string)) as
				| PessoaWithExames
				| undefined;
			setPessoa(result);
		})();
	}, [router.query.id]);

	if (!pessoa)
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loading />
			</div>
		);

	async function handleDelete() {
		const ok = confirm(`Remover pessoa "${pessoa?.nome}"?`);
		if (!ok) return;
		const status = await removerPessoa(pessoa?.id || "");
		if (!status) return alert("Erro ao remover pessoa!");
		router.push("/pessoas");
	}

	return (
		<div className="bg-gray-900 min-h-screen w-full p-6 text-white">
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">{pessoa.nome}</h1>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => router.push(`/pessoas/${pessoa.id}/editar`)}
						className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600"
					>
						Editar
					</button>
					<button
						type="button"
						onClick={handleDelete}
						className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
					>
						Remover
					</button>
					<button
						type="button"
						onClick={() => router.push("/pessoas")}
						className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
					>
						Voltar
					</button>
				</div>
			</header>

			<section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-slate-700 p-4 rounded-lg shadow">
					<h2 className="text-lg font-semibold text-gray-300 mb-2">Informações</h2>
					<p>
						<strong>CPF:</strong> {pessoa.cpf}
					</p>
					<p>
						<strong>Data de Nascimento:</strong>{" "}
						{moment(pessoa.dataNascimento).format("DD/MM/YYYY")}
					</p>
				</div>
			</section>

			<section className="mb-10">
				<h2 className="text-lg font-semibold mb-3">Exames</h2>
				<div className="overflow-x-auto">
					<table className="w-full border border-gray-700 rounded">
						<thead className="bg-gray-800">
							<tr>
								<th className="p-2 text-left">Data</th>
								<th className="p-2 text-left">Tipo</th>
								<th className="p-2 w-40 text-right"></th>
							</tr>
						</thead>
						<tbody>
							{(pessoa.exames || []).map((exame) => (
								<tr key={exame.id} className="border-t border-gray-700">
									<td className="p-2">{moment(exame.dataExame).format("DD/MM/YYYY")}</td>
									<td className="p-2">{exame.tipoExame?.toUpperCase?.() || exame.tipoExame}</td>
									<td className="p-2">
										<div className="flex justify-end">
											<button
												type="button"
												onClick={() => router.push(`/exames/${exame.id}`)}
												className="text-blue-300 hover:text-blue-400"
											>
												Abrir
											</button>
										</div>
									</td>
								</tr>
							))}

							{(pessoa.exames || []).length === 0 && (
								<tr className="border-t border-gray-700">
									<td className="p-4 text-gray-400" colSpan={3}>
										Nenhum exame vinculado.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}

