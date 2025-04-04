import Input from "@/components/Input";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, FormEvent, useState } from "react";
import moment from "@/utils/moment";
import socket from "@/utils/socket";
import { PessoaType, usePessoa } from "@/hooks/usePessoa";

export default function Novo() {
	const pessoas = usePessoa();
	const [form, setForm] = useState<PessoaType>({
		id: uuidv4(),
		nome: "",
		cpf: "",
		dataNascimento: "",
		dataExame: moment().format(),
		tipoExame: "",
		funcao: "",
		empresa: "",
		responsavel: "",
		documento: "",
		resultados: undefined,
	});

	const handleChange = (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]:
				e.target.name === "dataExame"
					? moment(e.target.value).format()
					: e.target.value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await pessoas.create(form);
		if (!res) {
			return alert("Erro ao criar pessoa");
		} else {
			socket.emit("get");
			location.href = "/";
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-gray-900 p-6 h-full w-full text-white"
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
					label="Documento do Médico"
					name="documento"
					value={form.documento}
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

				<div className="flex justify-between w-full space-x-4">
					<button
						type="submit"
						className="bg-vip hover:bg-green-600 w-full transition-colors text-white p-3 rounded font-semibold"
					>
						Enviar
					</button>
					<button
						type="reset"
						onClick={() => (location.href = "/")}
						className="bg-red-500 hover:bg-red-600 w-full transition-colors text-white p-3 rounded font-semibold"
					>
						Voltar
					</button>
				</div>
			</div>
		</form>
	);
}
