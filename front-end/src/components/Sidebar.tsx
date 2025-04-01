import { PessoaType, usePessoa } from "@/hooks/usePessoa";
import moment from "@/utils/moment";
import socket from "@/utils/socket";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Sidebar() {
	const [search, setSearch] = useState<string>("");
	const [pessoas, setPessoas] = useState<PessoaType[]>([]);
	const router = useRouter();
	const api = usePessoa();

	socket.on("data", (data: PessoaType[]) => {
		setPessoas(data as PessoaType[]);
	});

	useEffect(() => {
		socket.emit("get");
	}, []);

	if (router.asPath === "/")
		return (
			<div className="w-[25%] h-screen bg-slate-900 text-white shadow-xl">
				<div className="p-4">
					<h2 className="text-xl font-semibold mb-4">
						Lista de Pessoas
					</h2>
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
									onClick={() => api.set(person)}
									key={index}
									className="flex flex-col p-3 space-y-2 rounded bg-gray-800 hover:bg-gray-700"
								>
									<div className="flex w-full justify-between">
										<span>{person.nome}</span>
										<span>{person.cpf}</span>
									</div>
									<div className="flex w-full justify-between">
										<span>
											{moment(person.dataExame).format(
												"DD/MM/YYYY "
											)}
										</span>
										<span>{person.tipoExame}</span>
									</div>
								</li>
							))}
					</ul>
				</div>
			</div>
		);
}
