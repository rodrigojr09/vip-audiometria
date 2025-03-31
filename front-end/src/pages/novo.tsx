import Input from "@/components/Input";
import { v4 as uuidv4 } from "uuid";
import { DataType, useData } from "@/hooks/useData";
import { ChangeEvent, FormEvent, useState } from "react";
import moment from "@/utils/moment";
import socket from "@/utils/socket";

export default function Novo() {
	const api = useData();
	const [form, setForm] = useState<DataType>({
		id: uuidv4(),
		nome: "",
		cpf: "",
		dataNascimento: "",
		dataExame: moment().format(),
		tipoExame: "",
		funcao: "",
		empresa: "",
		responsavel: "",
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.name === "dataExame" ? moment(e.target.value).format() : e.target.value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		api.createData(form);
		socket.emit("get");
	};

	return (
		<div className="flex items-center flex-1 justify-center min-h-screen p-4">
			<form
				onSubmit={handleSubmit}
				className="bg-gray-900 p-6 w-full max-w-xl  text-white shadow-xl rounded-lg"
			>
				<h2 className="text-center text-xl font-semibold mb-6">
					Formulário de Exames
				</h2>

				<div className="grid gap-4">
					<Input
						label="Nome Completo"
						name="nome"
						value={form.nome}
						onChange={handleChange}
					/>
					<Input
						label="CPF"
						name="cpf"
						value={form.cpf}
						onChange={handleChange}
					/>
					<Input
						label="Data de Nascimento"
						name="dataNascimento"
						type="date"
						value={form.dataNascimento}
						onChange={handleChange}
					/>
					<Input
						label="Data do Exame"
						name="dataExame"
						type="date"
						value={moment(form.dataExame).format("YYYY-MM-DD")}
						onChange={handleChange}
					/>
					<Input
						label="Função"
						name="funcao"
						value={form.funcao}
						onChange={handleChange}
					/>
					<Input
						label="Empresa"
						name="empresa"
						value={form.empresa}
						onChange={handleChange}
					/>
					<Input
						label="Médico Responsável"
						name="responsavel"
						value={form.responsavel}
						onChange={handleChange}
					/>
					<Input
						label="Tipo de Exame"
						name="tipoExame"
						value={form.tipoExame}
						onChange={handleChange}
						type="select"
						options={[
							"admissional",
							"demissional",
							"periodico",
							"mudanca",
						]}
					/>

					<button
						type="submit"
						className="bg-vip hover:bg-green-600 transition-colors text-white p-3 rounded font-semibold"
					>
						Enviar
					</button>
				</div>
			</form>
		</div>
	);
}
