import { useConfig } from "@/hooks/useConfig";
import moment from "@/lib/moment";
import { Medica } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Config() {
	const router = useRouter();
	const config = useConfig();

	const [medica, setMedica] = useState<Medica>({
		nome: "",
		documento: "",
	});

	const [calibracao, setCalibracao] = useState<string>(
		moment(config.calibracao, "DD/MM/YYYY").format("YYYY-MM-DD"),
	);
	const [loading, setLoading] = useState(false);

	async function handleCriarMedica() {
		if (!medica.nome || !medica.documento) {
			alert("Preencha nome e documento.");
			return;
		}

		try {
			setLoading(true);
			await config.criarMedica(medica);
			setMedica({ id: "", nome: "", documento: "" });
			await config.reload();
		} catch {
			alert("Erro ao criar médica.");
		} finally {
			setLoading(false);
		}
	}

	async function handleSalvarCalibracao(e: React.FormEvent) {
		e.preventDefault();

		try {
			setLoading(true);
			await config.change(
				"calibracao",
				`${moment(calibracao).format("DD/MM/YYYY")}`,
			);
			await config.reload();
			alert("Configuração salva com sucesso!");
		} catch {
			alert("Erro ao atualizar configurações!");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="bg-gray-900 min-h-screen w-full p-6 text-white">
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Configurações</h1>
				<button
					type="button"
					onClick={() => router.back()}
					className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
				>
					Voltar
				</button>
			</header>

			<section className="mb-10">
				<h2 className="text-lg font-semibold mb-3">Médicas</h2>

				<div className="overflow-x-auto">
					<table className="w-full border border-gray-700 rounded">
						<thead className="bg-gray-800">
							<tr>
								<th className="p-2 text-left">Nome</th>
								<th className="p-2 text-left">Documento</th>
								<th className="p-2 w-24"></th>
							</tr>
						</thead>
						<tbody>
							{config.medicas.map((m) => (
								<tr key={m.id} className="border-t border-gray-700">
									<td className="p-2">{m.nome}</td>
									<td className="p-2">{m.documento}</td>
									<td className="p-2">
										<button
											type="button"
											onClick={() => config.removerMedica(m.id as string).then(() => config.reload())}
											className="text-red-400 hover:text-red-500"
										>
											Remover
										</button>
									</td>
								</tr>
							))}

							<tr className="border-t border-gray-700 bg-gray-800/40">
								<td className="p-2">
									<input
										className="w-full rounded bg-gray-900 border border-gray-700 p-2"
										placeholder="Nome"
										value={medica.nome}
										onChange={(e) =>
											setMedica({ ...medica, nome: e.target.value })
										}
									/>
								</td>
								<td className="p-2">
									<input
										className="w-full rounded bg-gray-900 border border-gray-700 p-2"
										placeholder="Documento"
										value={medica.documento}
										onChange={(e) =>
											setMedica({ ...medica, documento: e.target.value })
										}
									/>
								</td>
								<td className="p-2">
									<button
										type="button"
										onClick={handleCriarMedica}
										disabled={loading}
										className="w-full rounded bg-green-600 hover:bg-green-700 px-3 py-2 disabled:opacity-50"
									>
										Criar
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section>
				<form onSubmit={handleSalvarCalibracao} className="max-w-sm space-y-3">
					<h2 className="text-lg font-semibold">Data de Calibração</h2>

					<input
						type="date"
						value={calibracao}
						onChange={(e) => setCalibracao(e.target.value)}
						className="w-full rounded bg-gray-900 border border-gray-700 p-2"
					/>

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded bg-blue-600 hover:bg-blue-700 px-4 py-2 disabled:opacity-50"
					>
						Salvar
					</button>
				</form>
			</section>
		</div>
	);
}
