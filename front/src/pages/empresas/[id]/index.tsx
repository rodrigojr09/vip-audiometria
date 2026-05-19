import type { Empresa, Exame } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useEmpresa } from "@/hooks/useEmpresa";
import Loading from "@/pages/loading";
import moment from "@/lib/moment";

type EmpresaWithExames = Empresa & { exames?: Exame[] };

export default function EmpresaDetalhePage() {
	const router = useRouter();
	const { obterEmpresa, removerEmpresa } = useEmpresa();
	const [empresa, setEmpresa] = useState<EmpresaWithExames | undefined>(undefined);

	useEffect(() => {
		if (!router.query.id) return;
		(async () => {
			const result = (await obterEmpresa(router.query.id as string)) as
				| EmpresaWithExames
				| undefined;
			setEmpresa(result);
		})();
	}, [router.query.id]);

	if (!empresa)
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loading />
			</div>
		);

	async function handleDelete() {
		if (!empresa) return;
		const ok = confirm(`Remover empresa "${empresa.nome}"?`);
		if (!ok) return;
		const status = await removerEmpresa(empresa.id);
		if (!status) return alert("Erro ao remover empresa!");
		router.push("/empresas");
	}

	return (
		<div className="bg-gray-900 min-h-screen w-full p-6 text-white">
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">{empresa.nome}</h1>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => router.push(`/empresas/${empresa.id}/editar`)}
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
						onClick={() => router.push("/empresas")}
						className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
					>
						Voltar
					</button>
				</div>
			</header>

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
							{(empresa.exames || []).map((exame) => (
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

							{(empresa.exames || []).length === 0 && (
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
