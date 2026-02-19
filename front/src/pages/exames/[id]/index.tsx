import type { Exame } from "@prisma/client";
import { Download, Trash, Upload, User } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useExame } from "@/hooks/useExame";
import moment from "@/lib/moment";
import Loading from "../../loading";
import { useConfig } from "@/hooks/useConfig";

export default function PessoaPage() {
	const { obterExame, download, removerExame } = useExame();
    const config = useConfig();
	const router = useRouter();
	const [exame, setExame] = useState<Exame | undefined>(undefined);

	useEffect(() => {
		(async () => {
			const getE = (await obterExame(router.query.id as string)) as
				| Exame
				| undefined;
			setExame(getE);
		})();
	}, []);

	if (!exame)
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loading />
			</div>
		);

    
	return (
		<div className="bg-gray-900 p-6 w-full h-full text-white">
			{/* 📌 Cabeçalho */}
			<div className="flex justify-between items-center border-b pb-4 mb-6 border-gray-700">
				<h1 className="text-2xl font-bold flex items-center space-x-2">
					<User size={24} />
					<span>{exame.pessoa?.nome}</span>
				</h1>
			</div>

			{/* 📌 Informações da Pessoa */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-slate-700 p-4 rounded-lg shadow">
					<h2 className="text-lg font-semibold text-gray-300 mb-2">
						📄 Informações Pessoais
					</h2>
					<p>
						<strong>Nome:</strong> {exame.pessoa?.nome}
					</p>
					<p>
						<strong>CPF:</strong> {exame.pessoa?.cpf}
					</p>
					<p>
						<strong>Data de Nascimento:</strong>{" "}
						{moment(exame.pessoa?.dataNascimento).format("DD/MM/YYYY")}
					</p>
				</div>

				<div className="bg-slate-700 p-4 rounded-lg shadow">
					<h2 className="text-lg font-semibold text-gray-300 mb-2">
						📌 Audiometria
					</h2>
					<p>
						<strong>Tipo do Exame:</strong> {exame.tipoExame}
					</p>
					<p>
						<strong>Data do Exame:</strong>{" "}
						{moment(exame.dataExame).format("DD/MM/YYYY")}
					</p>
				</div>
			</div>

			{/* 📌 Botões de Ação */}
			<div className="flex justify-between w-full space-x-4 mt-6">
				<button
					type="button"
					onClick={() => download(exame.id,config.calibracao)}
					disabled={!exame.resultados}
					className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 w-1/4 rounded-lg transition disabled:opacity-50"
				>
					<Download size={18} />
					<span>Baixar Resultado</span>
                </button>
                
                <button
					type="button"
					onClick={() => download(exame.id,config.calibracao,true)}
					className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 w-1/4 rounded-lg transition"
				>
					<Download size={18} />
					<span>Baixar Requisição</span>
				</button>

				<button
					type="button"
					onClick={() => router.push(`/exames/${exame.id}/editar`)}
					className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 w-1/4 rounded-lg transition"
				>
					<Upload size={18} />
					<span>Fornecer Resultado</span>
				</button>

				<button
					type="button"
					onClick={() =>
						removerExame(exame.id).then(() => {
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
}
