import Resultados from "@/components/Resultados";
import { usePessoa } from "@/hooks/usePessoa";
import moment from "@/lib/moment";
import { Download, FileText, Trash, Upload, User } from "lucide-react";
import { useState } from "react";

export default function Home() {
	const { pessoa, ...pessoas } = usePessoa();
	const [enableResultado, setEnableResultado] = useState(false);
	if (!pessoa)
		return (
			<div className="flex items-center ml-[25%] justify-center w-[75%] h-screen text-gray-500">
				Selecione uma pessoa para mais informações
			</div>
		);

	if (enableResultado)
		return <Resultados onClose={() => setEnableResultado(false)} />;

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
					onClick={() => pessoas.download(pessoa.id, "resultado")}
					disabled={!pessoa.resultados}
					className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 w-1/4 rounded-lg transition disabled:opacity-50"
				>
					<Download size={18} />
					<span>Baixar Resultado</span>
				</button>

				<button
					onClick={() => setEnableResultado(true)}
					className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 w-1/4 rounded-lg transition"
				>
					<Upload size={18} />
					<span>Fornecer Resultado</span>
				</button>

				<button
					onClick={() => pessoas.download(pessoa.id, "requisicao")}
					className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 w-1/4 rounded-lg transition"
				>
					<FileText size={18} />
					<span>Baixar Requisição</span>
				</button>

				<button
					onClick={() =>
						pessoas.delete(pessoa.id).then(() => {
							pessoas.refresh();
							pessoas.set(undefined);
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
