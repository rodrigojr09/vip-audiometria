import type { Exame } from "@prisma/client";
import { useRouter } from "next/router";
import { type ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/Input";
import { useExame } from "@/hooks/useExame";
import type { ResultadoType } from "@/types/types";

const FREQUENCIAS = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000];
const FREQUENCIAS_OSSEA = [500, 1000, 2000, 3000, 4000];

const initialForm = {
	od: "",
	oe: "",
	d250: "",
	d500: "",
	d1000: "",
	d2000: "",
	d3000: "",
	d4000: "",
	d6000: "",
	d8000: "",
	e250: "",
	e500: "",
	e1000: "",
	e2000: "",
	e3000: "",
	e4000: "",
	e6000: "",
	e8000: "",
	obs: `OD - LIMIARES AUDITIVOS DENTRO DOS PADRÕES DE NORMALIDADE\nOE - LIMIARES AUDITIVOS DENTRO DOS PADRÕES DE NORMALIDADE`,
	ossea: undefined,
};

export default function Resultados() {
	const exames = useExame();
	const router = useRouter();

	const [exame, setExame] = useState<Exame | undefined>();
	const [viaOssea, setViaOssea] = useState(false);

	const [form, setForm] = useState<ResultadoType>(initialForm);

	useEffect(() => {
		if (!router.query.id) return;

		(async () => {
			const result = (await exames.obterExame(router.query.id as string)) as
				| Exame
				| undefined;

			if (!result) return;

			setExame(result);
			setViaOssea(!!result.resultados?.ossea);
			setForm(result.resultados || initialForm);
		})();
	}, [router.query.id]);

	// -----------------------------
	// HANDLERS
	// -----------------------------

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangeOssea = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			ossea: {
				...prev.ossea!,
				[name]: value,
			},
		}));
	};

	const toggleViaOssea = () => {
		setViaOssea((prev) => !prev);

		setForm((prev) => ({
			...prev,
			ossea: viaOssea ? { od: false, oe: false } : undefined,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!exame) return;

		const status = await exames.update({
			...exame,
			resultados: {
				...form,
				obs: form.obs.replaceAll("\n", "<br>"),
			},
		});

		if (status) {
			alert("Exame registrado com sucesso!");
			router.push(`/exames/${router.query.id}`);
		} else {
			alert("Erro ao finalizar exame!");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-gray-900 p-6 text-white shadow-xl rounded-lg w-full overflow-x-hidden"
		>
			<h2 className="text-center text-xl font-semibold mb-6">
				Formulário de Exames
			</h2>

			{/* RESULTADOS */}
			<h3 className="font-semibold mb-4">Resultados</h3>

			<div className="flex gap-6">
				{/* DIREITO */}
				<div className="flex flex-col w-full">
					<Input
						label="Ouvido Direito"
						name="od"
						type="select"
						value={form.od}
						options={["NORMAL", "ALTERADO"]}
						onChange={handleChange}
					/>

					{FREQUENCIAS.map((freq) => (
						<Input
							key={`d${freq}`}
							label={`OD ${freq}Hz`}
							name={`d${freq}`}
							value={(form as any)[`d${freq}`] || ""}
							onChange={handleChange}
						/>
					))}
				</div>

				{/* ESQUERDO */}
				<div className="flex flex-col w-full">
					<Input
						label="Ouvido Esquerdo"
						name="oe"
						type="select"
						value={form.oe}
						options={["NORMAL", "ALTERADO"]}
						onChange={handleChange}
					/>

					{FREQUENCIAS.map((freq) => (
						<Input
							key={`e${freq}`}
							label={`OE ${freq}Hz`}
							name={`e${freq}`}
							value={(form as any)[`e${freq}`] || ""}
							onChange={handleChange}
						/>
					))}
				</div>
			</div>

			{/* VIA OSSEA */}
			<h3 className="mt-8 font-bold text-xl text-center">Via Óssea</h3>

			<label className="flex justify-center gap-2 mb-4">
				<input type="checkbox" checked={viaOssea} onChange={toggleViaOssea} />
				Utilizar via óssea?
			</label>

			{viaOssea && (
				<div className="flex gap-6">
					{["od", "oe"].map((lado) => (
						<div key={lado} className="flex flex-col w-full">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.ossea?.[lado as "od" | "oe"]}
									onChange={() =>
										setForm((prev) => ({
											...prev,
											ossea: {
												...prev.ossea!,
												[lado]: !prev.ossea?.[lado as "od" | "oe"],
											},
										}))
									}
								/>
								Via Óssea {lado === "od" ? "Direita" : "Esquerda"}
							</label>

							{form.ossea?.[lado as "od" | "oe"] &&
								FREQUENCIAS_OSSEA.map((freq) => (
									<Input
										key={`${lado}${freq}`}
										label={`${lado.toUpperCase()} ${freq}Hz`}
										name={`${lado === "od" ? "d" : "e"}${freq}`}
										value={
											(form.ossea as any)?.[
												`${lado === "od" ? "d" : "e"}${freq}`
											] || ""
										}
										onChange={handleChangeOssea}
									/>
								))}
						</div>
					))}
				</div>
			)}

			{/* OBS */}
			<Input
				label="Observações"
				name="obs"
				type="area"
				value={form.obs?.replaceAll("<br>", "\n") || ""}
				onChange={handleChange}
			/>

			{/* BUTTONS */}
			<div className="flex gap-4 mt-4">
				<button
					type="submit"
					className="bg-green-500 hover:bg-green-600 w-full p-3 rounded font-semibold"
				>
					Salvar Exame
				</button>

				<button
					type="button"
					onClick={() => router.back()}
					className="bg-red-500 hover:bg-red-600 w-full p-3 rounded font-semibold"
				>
					Voltar
				</button>
			</div>
		</form>
	);
}
