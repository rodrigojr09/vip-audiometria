import Input from "@/components/Input";
import { ChangeEvent, useState } from "react";
import { usePessoa } from "@/hooks/usePessoa";
import { ResultadoType } from "@prisma/client";
import { dados } from "@/lib/dados";

export default function Resultados({ onClose }: { onClose: () => void }) {
	const {
		pessoa: { ...pessoa },
		...pessoas
	} = usePessoa();
	const [laudo, setLaudo] = useState<string>("");
	const [form, setForm] = useState<ResultadoType>(
		pessoa.resultados || {
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
			dcera: "",
			e250: "",
			e500: "",
			e1000: "",
			e2000: "",
			e3000: "",
			e4000: "",
			e6000: "",
			e8000: "",
			ecera: "",
			obs: "",
		}
	);

	const handleChange = (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const status = await pessoas.update({
			...pessoa,
			resultados: { ...form, obs: form.obs.replaceAll("\n", "<br>") },
		});
		if (status) {
			alert("Exame registrado com sucesso!");
			const data = await pessoas.get(pessoa.id);
			if (!Array.isArray(data)) pessoas.set(data);
			onClose();
		} else alert("Erro ao finalizar exame!");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-gray-900 p-6 w-full ml-[25%] h-full min-h-max text-white shadow-xl rounded-lg"
		>
			<h2 className="text-center text-xl font-semibold mb-6">
				Formulário de Exames
			</h2>

			<h3 className="mt-4 font-semibold">Resultados</h3>
			<div className="flex space-x-4 w-full">
				<div className="flex flex-col w-full">
					<Input
						label="Ouvido Direito"
						name="od"
						type="select"
						value={form.od}
						options={["NORMAL", "ALTERADO"]}
						onChange={handleChange}
					/>
					<Input
						label="OD 250Hz"
						name="d250"
						value={form.d250}
						onChange={handleChange}
					/>
					<Input
						label="OD 500Hz"
						name="d500"
						value={form.d500}
						onChange={handleChange}
					/>
					<Input
						label="OD 1000Hz"
						name="d1000"
						value={form.d1000}
						onChange={handleChange}
					/>
					<Input
						label="OD 2000Hz"
						name="d2000"
						value={form.d2000}
						onChange={handleChange}
					/>
					<Input
						label="OD 3000Hz"
						name="d3000"
						value={form.d3000}
						onChange={handleChange}
					/>
					<Input
						label="OD 4000Hz"
						name="d4000"
						value={form.d4000}
						onChange={handleChange}
					/>
					<Input
						label="OD 6000Hz"
						name="d6000"
						value={form.d6000}
						onChange={handleChange}
					/>
					<Input
						label="OD 8000Hz"
						name="d8000"
						value={form.d8000}
						onChange={handleChange}
					/>
					<Input
						label="OD CERA"
						name="dcera"
						value={form.dcera}
						onChange={handleChange}
					/>
				</div>

				<div className="flex flex-col w-full">
					<Input
						label="Ouvido Esquerdo"
						name="oe"
						type="select"
						value={form.oe}
						options={["NORMAL", "ALTERADO"]}
						onChange={handleChange}
					/>
					<Input
						label="OE 250Hz"
						name="e250"
						value={form.e250}
						onChange={handleChange}
					/>
					<Input
						label="OE 500Hz"
						name="e500"
						value={form.e500}
						onChange={handleChange}
					/>
					<Input
						label="OE 1000Hz"
						name="e1000"
						value={form.e1000}
						onChange={handleChange}
					/>
					<Input
						label="OE 2000Hz"
						name="e2000"
						value={form.e2000}
						onChange={handleChange}
					/>
					<Input
						label="OE 3000Hz"
						name="e3000"
						value={form.e3000}
						onChange={handleChange}
					/>
					<Input
						label="OE 4000Hz"
						name="e4000"
						value={form.e4000}
						onChange={handleChange}
					/>
					<Input
						label="OE 6000Hz"
						name="e6000"
						value={form.e6000}
						onChange={handleChange}
					/>
					<Input
						label="OE 8000Hz"
						name="e8000"
						value={form.e8000}
						onChange={handleChange}
					/>
					<Input
						label="OE CERA"
						name="ecera"
						value={form.ecera}
						onChange={handleChange}
					/>
				</div>
			</div>
			
			<Input
				label="Laudo"
				name="laudo"
				type="select"
				value={laudo}
				onChange={(e) => setLaudo(e.target.value)}
				options={dados.laudos}
			/>

			<Input
				label="Observações"
				name="obs"
				type="area"
				value={form.obs.replaceAll("<br>", "\n")}
				onChange={handleChange}
			/>

			<div className="flex space-x-4">
				<button
					type="submit"
					className="bg-green-500 hover:bg-green-600 w-full text-white p-3 rounded font-semibold mt-4"
				>
					Salvar Exame
				</button>
				<button
					type="button"
					onClick={onClose}
					className="bg-red-500 hover:bg-red-600 w-full text-white p-3 rounded font-semibold mt-4"
				>
					Voltar
				</button>
			</div>
		</form>
	);
}
