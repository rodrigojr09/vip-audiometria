import type { Pessoa } from "@prisma/client";
import { useRouter } from "next/router";
import { type ChangeEvent, type FormEvent, useState } from "react";
import Input from "@/components/Input";
import { usePessoa } from "@/hooks/usePessoa";
import moment from "@/lib/moment";
import { formatCPF } from "@/lib/api";

export default function NovaPessoaPage() {
	const router = useRouter();
	const { create } = usePessoa();

	const [pessoa, setPessoa] = useState<Pessoa>({
		id: "",
		nome: "",
		cpf: "",
		dataNascimento: moment().format("YYYY-MM-DD"),
	});
	const [loading, setLoading] = useState(false);

	function handleChange(
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) {
		const { name, value } = e.target;
		if (name === "cpf") {
			setPessoa((prev) => ({ ...prev, cpf: formatCPF(value) }));
			return;
		}
		setPessoa((prev) => ({ ...prev, [name]: value } as Pessoa));
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		try {
			setLoading(true);
			const created = await create(pessoa);
			if (!created) return alert("Erro ao criar pessoa!");
			alert("Pessoa criada com sucesso!");
			router.push(`/pessoas/${created.id}`);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="bg-gray-900 min-h-screen w-full p-6 text-white">
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Nova Pessoa</h1>
				<button
					type="button"
					onClick={() => router.back()}
					className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
				>
					Voltar
				</button>
			</header>

			<div className="max-w-xl">
				<Input label="Nome" name="nome" value={pessoa.nome} onChange={handleChange} />
				<Input label="CPF" name="cpf" value={pessoa.cpf} onChange={handleChange} />
				<Input
					label="Data de Nascimento"
					name="dataNascimento"
					type="date"
					value={moment(pessoa.dataNascimento).format("YYYY-MM-DD")}
					onChange={handleChange}
				/>

				<div className="flex gap-4 mt-6">
					<button
						type="submit"
						disabled={loading}
						className="bg-green-600 hover:bg-green-700 w-full p-3 rounded font-semibold disabled:opacity-50"
					>
						Criar
					</button>
					<button
						type="button"
						onClick={() => router.back()}
						className="bg-gray-700 hover:bg-gray-600 w-full p-3 rounded font-semibold"
					>
						Cancelar
					</button>
				</div>
			</div>
		</form>
	);
}

