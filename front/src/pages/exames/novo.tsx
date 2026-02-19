import type { Exame } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Step1Pessoa from "@/components/exames/Step1Pessoa";
import Input from "@/components/Input";
import { useConfig } from "@/hooks/useConfig";
import moment from "@/lib/moment";
import Step2Empresa from "@/components/exames/Step2Empresa";
import { useExame } from "@/hooks/useExame";
import { useRouter } from "next/router";

export default function NovoExamePage() {
	const [step, setStep] = useState<1 | 2 | 3>(1);
	const { create } = useExame();
	const router = useRouter();

	const nextStep = () =>
		setStep((prev) => (prev < 3 ? ((prev + 1) as any) : prev));
	const prevStep = () =>
		setStep((prev) => (prev > 1 ? ((prev - 1) as any) : prev));

	const { medicas } = useConfig();
	const [exame, setExame] = useState<Exame>({
		id: uuidv4(),
		dataExame: moment().format(),
		tipoExame: "",
		funcao: "",
		responsavel: "",
		documento: "",
		pessoaId: "",
		empresaId: "",
		resultados: undefined,
	});

	function handleChangeExame(
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) {
		const { name, value } = e.target;
		setExame((prev) => ({ ...prev, [name]: value }));
	}

	function selectPessoa(id: string) {
		setExame((prev) => ({ ...prev, pessoaId: id }));
	}

	function selectEmpresa(id: string) {
		setExame((prev) => ({ ...prev, empresaId: id }));
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (step < 3) return nextStep();

		const status = await create(exame);
		if (status) {
			alert("Exame registrado com sucesso!");
			router.push(`/exames/${exame.id}`);
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

			{step === 1 && (
				<Step1Pessoa
					selectPessoa={selectPessoa}
					selected={exame.pessoaId as string}
					nextStep={nextStep}
				/>
			)}

			{step === 2 && (
				<Step2Empresa
					selectEmpresa={selectEmpresa}
					changeExame={handleChangeExame}
					funcao={exame.funcao}
					selectedEmpresa={exame.empresaId as string}
					nextStep={nextStep}
					prevStep={prevStep}
				/>
			)}

			{step === 3 && (
				<div className="grid gap-4">
					<h3 className="text-lg font-semibold">3º - Exame</h3>

					<Input
						label="Data do Exame"
						name="dataExame"
						type="date"
						value={moment(exame.dataExame).format("YYYY-MM-DD")}
						onChange={handleChangeExame}
					/>

					<Input
						label="Tipo de Exame"
						name="tipoExame"
						type="select"
						value={exame.tipoExame}
						onChange={handleChangeExame}
						options={["admissional", "demissional", "periodico", "mudanca"]}
					/>

					<Input
						label="Responsável"
						name="responsavel"
						type="select"
						value={exame.responsavel}
						onChange={(e) => {
							setExame((prev: any) => ({
								...prev,
								responsavel: e.target.value,
								documento:
									medicas.find((p) => p.nome === e.target.value)?.documento ||
									"",
							}));
						}}
						options={medicas.map((p) => p.nome)}
					/>

					{exame.responsavel && (
						<p className="flex items-center gap-2 text-sm text-gray-400">
							<ChevronRight size={16} />
							{exame.documento}
						</p>
					)}

					<div className="flex gap-4">
						<button
							type="button"
							onClick={prevStep}
							className="bg-gray-700 p-3 rounded font-semibold w-full"
						>
							Voltar
						</button>

						<button
							type="submit"
							className="bg-vip p-3 rounded font-semibold w-full"
						>
							Finalizar
						</button>
					</div>
				</div>
			)}
		</form>
	);
}
