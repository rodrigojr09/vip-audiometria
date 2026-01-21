import { Download, FileText, Trash, Upload, User } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePessoa } from "@/hooks/usePessoa";
import moment from "@/lib/moment";
import type { Pessoa } from "@/types";
import Loading from "../../loading";

export default function PessoaPage() {
	const { obterPessoa, download, removerPessoa } = usePessoa();
	const router = useRouter();
	const [pessoa, setPessoa] = useState<Pessoa | undefined>(undefined);

	// biome-ignore lint/correctness/useExhaustiveDependencies: off
	useEffect(() => {
		(async () => {
			const getp = (await obterPessoa(router.query.id as string)) as
				| Pessoa
				| undefined;
			setPessoa(getp);
		})();
	}, []);

	if (pessoa)
		return (
			<div className="p-6 ml-[25%] h-full w-[75%] relative text-white">
				{/* 📌 Cabeçalho */}
				<div className="flex justify-between items-center border-b pb-4 mb-6 border-gray-700">
					<h1 className="text-2xl font-bold flex items-center space-x-2">
						<User size={24} />
						<span>{pessoa.nome}</span>
					</h1>
				</div>

				{/* 📌 Informações da Pessoa */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-slate-700 p-4 rounded-lg shadow">
						<h2 className="text-lg font-semibold text-gray-300 mb-2">
							📄 Informações Pessoais
						</h2>
						<p>
							<strong>Nome:</strong> {pessoa.nome}
						</p>
						<p>
							<strong>CPF:</strong> {pessoa.cpf}
						</p>
						<p>
							<strong>Data de Nascimento:</strong>{" "}
							{moment(pessoa.dataNascimento).format("DD/MM/YYYY")}
						</p>
					</div>

					<div className="bg-slate-700 p-4 rounded-lg shadow">
						<h2 className="text-lg font-semibold text-gray-300 mb-2">
							📌 Audiometria
						</h2>
						<p>
							<strong>Tipo do Exame:</strong> {pessoa.tipoExame}
						</p>
						<p>
							<strong>Data do Exame:</strong>{" "}
							{moment(pessoa.dataExame).format("DD/MM/YYYY")}
						</p>
					</div>
				</div>

				{/* 📌 Botões de Ação */}
				<div className="flex justify-between w-full space-x-4 mt-6">
					<button
						type="button"
						onClick={() => download(pessoa.id, "resultado")}
						disabled={!pessoa.resultados}
						className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 w-1/4 rounded-lg transition disabled:opacity-50"
					>
						<Download size={18} />
						<span>Baixar Resultado</span>
					</button>

					<button
						type="button"
						onClick={() => router.push(`/pessoas/${pessoa.id}/editar`)}
						className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 w-1/4 rounded-lg transition"
					>
						<Upload size={18} />
						<span>Fornecer Resultado</span>
					</button>

					<button
						type="button"
						onClick={() => download(pessoa.id, "requisicao")}
						className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 w-1/4 rounded-lg transition"
					>
						<FileText size={18} />
						<span>Baixar Requisição</span>
					</button>

					<button
						type="button"
						onClick={() =>
							removerPessoa(pessoa.id).then(() => {
								router.push("/");
							})
						}
						className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 w-1/4 rounded-lg transition"
					>
						<Trash size={18} />
						<span>Deletar</span>
					</button>
				</div>
			</div>
		);
	else return <Loading />;
}
