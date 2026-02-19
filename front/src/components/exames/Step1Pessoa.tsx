import type { Pessoa } from "@prisma/client";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "@/components/Input";
import { usePessoa } from "@/hooks/usePessoa";
import { formatCPF } from "@/lib/api";
import moment from "@/lib/moment";

type Props = {
	selected: string;
	selectPessoa: (id: string) => void;
	nextStep: () => void;
};

export default function Step1Pessoa({
	selected,
	selectPessoa,
	nextStep,
}: Props) {
	const { pessoas, create } = usePessoa();

	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState<Pessoa[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [preview, setPreview] = useState<Pessoa | null>(
		pessoas.find((a) => a.id === selected) || null,
	);

	const [modalForm, setModalForm] = useState({
		nome: "",
		cpf: "",
		dataNascimento: "",
	});

	/* ==============================
	   🔎 Busca por nome ou CPF
	================================ */
	useEffect(() => {
		if (!search || selected) {
			setFiltered([]);
			return;
		}

		const term = search.toLowerCase();
		const termNumbers = search.replace(/\D/g, "");

		const results = pessoas.filter(
			(p) => p.nome.toLowerCase().includes(term) || p.cpf.includes(termNumbers),
		);

		setFiltered(results);
	}, [search, pessoas, selected]);

	/* ==============================
	   👤 Selecionar pessoa existente
	================================ */
	const handleSelect = (p: Pessoa) => {
		selectPessoa(p.id);
		setPreview(p);
		setSearch("");
		setFiltered([]);
	};

	/* ==============================
	   ➕ Criar nova pessoa
	================================ */
	const handleCreatePessoa = async () => {
		const cpfNumbers = modalForm.cpf.replace(/\D/g, "");

		if (
			!modalForm.nome.trim() ||
			cpfNumbers.length !== 11 ||
			!modalForm.dataNascimento
		)
			return;

		const newData: Pessoa = {
			id: uuidv4(),
			nome: modalForm.nome.trim(),
			cpf: cpfNumbers,
			dataNascimento: modalForm.dataNascimento,
		};

		const created = await create(newData);
		if (!created) return;

		selectPessoa(created.id);
		setPreview(newData);
		setShowModal(false);
		setModalForm({ nome: "", cpf: "", dataNascimento: "" });
	};

	/* ==============================
	   🔒 Validação botão salvar
	================================ */
	const isInvalid = useMemo(() => {
		return (
			!modalForm.nome.trim() ||
			modalForm.cpf.replace(/\D/g, "").length !== 11 ||
			!modalForm.dataNascimento
		);
	}, [modalForm]);

	return (
		<div className="grid gap-5 relative">
			<h3 className="text-lg font-semibold">1º - Pessoa</h3>

			{/* ============================== */}
			{/* 🔎 Busca */}
			{/* ============================== */}
			<div className="relative">
				<label htmlFor="search" className="text-sm font-medium text-gray-300">
					Buscar por Nome ou CPF
				</label>

				<div className="flex gap-2 mt-2">
					<input
						type="text"
						id="search"
						className="border border-vip bg-gray-800 p-2 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-vip"
						value={
							preview ? `${preview.nome} • ${formatCPF(preview.cpf)}` : search
						}
						readOnly={!!preview}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<button
						type="button"
						onClick={() => setShowModal(true)}
						className="bg-vip p-3 rounded-lg hover:bg-green-600 transition"
					>
						<Plus size={18} />
					</button>
				</div>

				{/* Dropdown */}
				{filtered.length > 0 && (
					<div className="absolute z-30 bg-gray-800 border border-gray-700 w-full mt-1 rounded-lg shadow-xl max-h-60 overflow-y-auto">
						{filtered.map((p) => (
							<button
								key={p.id}
								type="button"
								onClick={() => handleSelect(p)}
								className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
							>
								<p className="font-medium">{p.nome}</p>
								<p className="text-xs text-gray-400">{formatCPF(p.cpf)}</p>
							</button>
						))}
					</div>
				)}
			</div>

			{/* ============================== */}
			{/* 👁 Preview */}
			{/* ============================== */}
			{preview && (
				<div className="bg-gray-800/80 backdrop-blur p-4 rounded-xl text-sm border border-gray-700 space-y-1">
					<p>
						<strong>Nome:</strong> {preview.nome}
					</p>
					<p>
						<strong>CPF:</strong> {formatCPF(preview.cpf)}
					</p>
					<p>
						<strong>Nascimento:</strong>{" "}
						{moment(preview.dataNascimento).format("DD/MM/YYYY")}
					</p>

					<button
						type="button"
						onClick={() => {
							setPreview(null);
							selectPessoa("");
						}}
						className="text-xs text-red-400 mt-2 hover:underline"
					>
						Remover seleção
					</button>
				</div>
			)}

			{/* ============================== */}
			{/* Próximo */}
			{/* ============================== */}
			<button
				type="button"
				onClick={nextStep}
				disabled={!selected}
				className="bg-vip p-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-green-600 transition"
			>
				Próximo
			</button>

			{/* ============================== */}
			{/* 🪟 Modal */}
			{/* ============================== */}
			{showModal && (
				<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-gray-900 p-6 rounded-xl w-96 shadow-2xl border border-gray-700 space-y-4">
						<h3 className="text-lg font-semibold">Nova Pessoa</h3>

						<Input
							name="nome"
							label="Nome"
							value={modalForm.nome}
							onChange={(e) =>
								setModalForm((prev) => ({
									...prev,
									nome: e.target.value,
								}))
							}
						/>

						<Input
							name="cpf"
							label="CPF"
							type="text"
							value={modalForm.cpf}
							onChange={(e) => {
								const onlyNumbers = e.target.value
									.replace(/\D/g, "")
									.slice(0, 11);

								setModalForm((prev) => ({
									...prev,
									cpf: formatCPF(onlyNumbers),
								}));
							}}
						/>

						<Input
							name="dataNascimento"
							label="Data de Nascimento"
							type="date"
							value={modalForm.dataNascimento}
							onChange={(e) =>
								setModalForm((prev) => ({
									...prev,
									dataNascimento: e.target.value,
								}))
							}
						/>

						<div className="flex gap-4 pt-2">
							<button
								type="button"
								onClick={() => setShowModal(false)}
								className="bg-gray-700 w-full p-2 rounded-lg hover:bg-gray-600 transition"
							>
								Cancelar
							</button>

							<button
								type="button"
								onClick={handleCreatePessoa}
								disabled={isInvalid}
								className="bg-vip w-full p-2 rounded-lg font-semibold disabled:opacity-50 hover:bg-green-600 transition"
							>
								Salvar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
