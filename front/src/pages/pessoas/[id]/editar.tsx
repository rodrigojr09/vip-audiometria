import type { Pessoa } from "@prisma/client";
import { useRouter } from "next/router";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import Input from "@/components/Input";
import { usePessoa } from "@/hooks/usePessoa";
import Loading from "@/pages/loading";
import moment from "@/lib/moment";
import { formatCPF } from "@/lib/api";

export default function EditarPessoaPage() {
	const router = useRouter();
	const { obterPessoa, update } = usePessoa();
	const [pessoa, setPessoa] = useState<Pessoa | undefined>(undefined);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!router.query.id) return;
		(async () => {
			const result = (await obterPessoa(router.query.id as string)) as
				| Pessoa
				| undefined;
			setPessoa(result);
		})();
	}, [router.query.id]);

	function handleChange(
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) {
		const { name, value } = e.target;
		if (name === "cpf") {
			setPessoa((prev) => (prev ? { ...prev, cpf: formatCPF(value) } : prev));
			return;
		}
		setPessoa((prev) => (prev ? ({ ...prev, [name]: value } as Pessoa) : prev));
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (!pessoa) return;
		try {
			setLoading(true);
			const status = await update(pessoa);
			if (!status) return alert("Erro ao salvar pessoa!");
			alert("Pessoa salva com sucesso!");
			router.push(`/pessoas/${pessoa.id}`);
		} finally {
			setLoading(false);
		}
	}

	if (!pessoa)
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loading />
			</div>
		);

	return (
		<form onSubmit={handleSubmit} className="bg-gray-900 min-h-screen w-full p-6 text-white">
			<header className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Editar Pessoa</h1>
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
						Salvar
					</button>
					<button
						type="button"
						onClick={() => router.push(`/pessoas/${pessoa.id}`)}
						className="bg-gray-700 hover:bg-gray-600 w-full p-3 rounded font-semibold"
					>
						Cancelar
					</button>
				</div>
			</div>
		</form>
	);
}

