import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useExame } from "@/hooks/useExame";
import moment from "@/lib/moment";

const ITEMS_PER_PAGE = 10;

export default function Sidebar() {
	const [search, setSearch] = useState<string>("");
	const [page, setPage] = useState<number>(1);

	const router = useRouter();

	const { exames } = useExame();

	const filtered = useMemo(() => {
		return exames.filter(
			(exame) =>
				exame.pessoa?.nome.toLowerCase().includes(search.toLowerCase()) ||
				exame.pessoa?.cpf.includes(search),
		);
	}, [exames, search]);

	const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

	const paginated = useMemo(() => {
		const start = (page - 1) * ITEMS_PER_PAGE;
		return filtered.slice(start, start + ITEMS_PER_PAGE);
	}, [filtered, page]);

	return (
		<div className="w-[320px] h-screen fixed bg-slate-900 text-white shadow-xl flex flex-col">
			{/* Header fixo */}
			<div className="p-4 shrink-0">
				<h2 className="text-xl font-semibold mb-4">Lista de Pessoas</h2>

				<input
					type="text"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setPage(1);
					}}
					placeholder="Pesquisar por nome ou CPF"
					className="p-2 w-full rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-vip mb-2"
				/>

				<button
					type="button"
					onClick={() => router.push("/exames/novo")}
					className="p-2 w-full rounded bg-vip text-white mb-4"
				>
					Criar
				</button>
			</div>

			{/* Lista com scroll */}
			<div className="flex-1 overflow-y-auto px-4">
				<ul className="space-y-2 pb-4">
					{paginated.map((exame) => (
						<ul key={exame.pessoa?.cpf}>
							<button
                                type="button"
								onClick={() => router.push(`/exames/${exame.id}`)}
								className="flex flex-col p-3 w-full space-y-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer"
							>
								<div className="flex flex-col text-start">
									<span className="text-vip font-bold">
										{exame.pessoa?.nome.toUpperCase()}
									</span>
									<span>{exame.pessoa?.cpf}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-400">
										{moment(exame.dataExame).format("DD/MM/YYYY")}
									</span>
									<span className="text-sm text-gray-400">
										{exame.tipoExame.toUpperCase()}
									</span>
								</div>
							</button>
						</ul>
					))}
				</ul>
			</div>

			{/* Paginação fixa no rodapé */}
			<div className="p-4 border-t border-gray-700 flex justify-between items-center shrink-0">
				<button
					type="button"
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
					className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
				>
					Anterior
				</button>

				<span className="text-sm">
					Página {page} de {totalPages || 1}
				</span>

				<button
					type="button"
					onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
					disabled={page === totalPages || totalPages === 0}
					className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
				>
					Próxima
				</button>
			</div>
		</div>
	);
}
