import { DataType, useData } from "@/hooks/useData";
import moment from "@/utils/moment";
import socket from "@/utils/socket";
import { Download, FileText, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
	const [search, setSearch] = useState<string>("");
	const [pessoas, setPessoas] = useState<DataType[]>([]);
	const api = useData();

	socket.on("data", (data: DataType[]) => {
		setPessoas(data as DataType[]);
	});

	useEffect(() => {
		socket.emit("get");
	}, []);

	return (
		<div className="w-64 h-screen bg-gray-900 text-white shadow-xl">
			<div className="p-4">
				<h2 className="text-xl font-semibold mb-4">Lista de Pessoas</h2>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Pesquisar por nome ou CPF"
					className="p-2 w-full rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-vip mb-2"
				/>
				<button
					onClick={() => (window.location.href = "/novo")}
					className="p-2 w-full rounded bg-vip text-white hover:cursor-pointer mb-4"
				>
					Criar
				</button>
				<ul className="space-y-2">
					{pessoas
						.filter(
							(person) =>
								person.nome
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								person.cpf.includes(search)
						)
						.sort((a, b) => {
							const dateA = moment(a.dataExame); // Moment vai entender o formato ISO 8601
							const dateB = moment(b.dataExame); // Moment vai entender o formato ISO 8601
							return dateB.isAfter(dateA) ? 1 : -1; // Ordena do mais recente para o mais antigo
						})
						.map((person, index) => (
							<li
								key={index}
								className="flex flex-col p-3 space-y-2 rounded bg-gray-800 hover:bg-gray-700"
							>
								<div className="flex w-full justify-between">
									<span>{person.nome}</span>
									<span>{person.cpf}</span>
								</div>
								<div className="flex w-full justify-between">
									<span>{moment(person.dataExame).format("DD/MM/YYYY ")}</span>
									<span>{person.tipoExame}</span>
								</div>
								<div className="flex w-full justify-between">
									{/* prettier-ignore */}
									<button onClick={() => api.deleteData(person.id)} className="bg-green-500 hover:cursor-pointer hover:text-green-300 p-2 rounded-full"><Download size={15} /></button>
									{/* prettier-ignore */}
									<button onClick={() =>api.deleteData(person.id)} className="bg-blue-500 hover:cursor-pointer hover:text-blue-300 p-2 rounded-full"><FileText size={15} /></button>
									{/* prettier-ignore */}
									<button onClick={() =>api.deleteData(person.id)} className="bg-red-500 hover:cursor-pointer hover:text-red-300 p-2 rounded-full"><Trash size={15} /></button>
								</div>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
