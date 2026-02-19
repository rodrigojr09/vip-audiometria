import type { Empresa } from "@prisma/client";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "@/components/Input";
import { useEmpresa } from "@/hooks/useEmpresa";

type Props = {
	selectedEmpresa: string;
	funcao: string;
	selectEmpresa: (id: string) => void;
	changeExame: (e: React.ChangeEvent<HTMLInputElement>) => void;
	nextStep: () => void;
	prevStep: () => void;
};

export default function Step2Empresa({
	selectedEmpresa,
	funcao,
	selectEmpresa,
	changeExame,
	nextStep,
	prevStep,
}: Props) {
	const { empresas, create } = useEmpresa();

	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState<Empresa[]>([]);
	const [previewEmpresa, setPreviewEmpresa] = useState<Empresa | null>(null);

	const [showEmpresaModal, setShowEmpresaModal] = useState(false);
	const [empresaNome, setEmpresaNome] = useState("");

	/* ==============================
	   🔎 Busca empresa
	================================ */
	useEffect(() => {
		if (!search || previewEmpresa) {
			setFiltered([]);
			return;
		}

		const term = search.toLowerCase().trim();

		const results = empresas.filter((e) => e.nome.toLowerCase().includes(term));

		setFiltered(results);
	}, [search, empresas, previewEmpresa]);

	/* ==============================
	   👤 Selecionar empresa
	================================ */
	const handleSelectEmpresa = (empresa: Empresa) => {
		selectEmpresa(empresa.id);
		setPreviewEmpresa(empresa);
		setSearch("");
		setFiltered([]);
	};

	/* ==============================
	   ➕ Criar nova empresa
	================================ */
	const handleCreateEmpresa = async () => {
		const nomeLimpo = empresaNome.trim();
		if (!nomeLimpo) return;

		const exists = empresas.some(
			(e) => e.nome.toLowerCase() === nomeLimpo.toLowerCase(),
		);
		if (exists) return;

		const newEmpresa: Empresa = {
			id: uuidv4(),
			nome: nomeLimpo,
			exames: [],
		};

		const created = await create(newEmpresa);
		if (!created) return;

		selectEmpresa(created.id);
		setPreviewEmpresa(newEmpresa);
		setShowEmpresaModal(false);
		setEmpresaNome("");
	};

	const isNextDisabled = useMemo(() => {
		return !selectedEmpresa || !funcao.trim();
	}, [selectedEmpresa, funcao]);

	return (
		<div className="grid gap-5 relative">
			<h3 className="text-lg font-semibold">2º - Empresa</h3>

			{/* ============================== */}
			{/* 🔎 Busca Empresa */}
			{/* ============================== */}
			<div className="relative">
				<label htmlFor="empresa" className="text-sm font-medium text-gray-300">
					Buscar Empresa
				</label>

				<div className="flex gap-2 mt-2">
					<input
						type="text"
						id="empresa"
						className="border border-vip bg-gray-800 p-2 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-vip"
						value={previewEmpresa ? previewEmpresa.nome : search}
						readOnly={!!previewEmpresa}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<button
						type="button"
						onClick={() => setShowEmpresaModal(true)}
						className="bg-vip p-3 rounded-lg hover:bg-green-600 transition"
					>
						<Plus size={18} />
					</button>
				</div>

				{filtered.length > 0 && (
					<div className="absolute z-30 bg-gray-800 border border-gray-700 w-full mt-1 rounded-lg shadow-xl max-h-60 overflow-y-auto">
						{filtered.map((empresa) => (
							<button
								key={empresa.id}
								type="button"
								onClick={() => handleSelectEmpresa(empresa)}
								className="w-full text-left px-4 py-3 hover:bg-gray-700 transition"
							>
								{empresa.nome}
							</button>
						))}
					</div>
				)}
			</div>

			{/* ============================== */}
			{/* 🏢 Preview */}
			{/* ============================== */}
			{previewEmpresa && (
				<div className="bg-gray-800/80 backdrop-blur p-4 rounded-xl border border-gray-700 space-y-3">
					<p className="font-semibold text-base">{previewEmpresa.nome}</p>

					<button
						type="button"
						onClick={() => {
							setPreviewEmpresa(null);
							selectEmpresa("");
						}}
						className="text-xs text-red-400 hover:underline"
					>
						Remover seleção
					</button>
				</div>
			)}

			{/* ============================== */}
			{/* 🧑‍💼 Função (campo livre) */}
			{/* ============================== */}
			<div>
				<label htmlFor="funcao" className="text-sm font-medium text-gray-300">
					Função
				</label>

				<input
					className="border border-vip bg-gray-800 p-2 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-vip"
					type="text"
					id="funcao"
					name="funcao"
					value={funcao}
					onChange={changeExame}
				/>
			</div>

			{/* ============================== */}
			{/* Navegação */}
			{/* ============================== */}
			<div className="flex gap-4">
				<button
					type="button"
					onClick={prevStep}
					className="bg-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-600 transition"
				>
					Voltar
				</button>

				<button
					type="button"
					onClick={nextStep}
					disabled={isNextDisabled}
					className="bg-vip p-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-green-600 transition"
				>
					Próximo
				</button>
			</div>

			{/* ============================== */}
			{/* Modal Empresa */}
			{/* ============================== */}
			{showEmpresaModal && (
				<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-gray-900 p-6 rounded-xl w-96 shadow-2xl border border-gray-700 space-y-4">
						<h3 className="text-lg font-semibold">Nova Empresa</h3>

						<Input
							name="empresa"
							label="Nome da Empresa"
							value={empresaNome}
							onChange={(e) => setEmpresaNome(e.target.value)}
						/>

						<div className="flex gap-4 pt-2">
							<button
								type="button"
								onClick={() => setShowEmpresaModal(false)}
								className="bg-gray-700 w-full p-2 rounded-lg hover:bg-gray-600 transition"
							>
								Cancelar
							</button>

							<button
								type="button"
								onClick={handleCreateEmpresa}
								disabled={!empresaNome.trim()}
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
