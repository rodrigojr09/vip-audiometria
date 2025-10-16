import type {
	BubbleDataPoint,
	ChartDataset,
	ChartOptions,
	ChartTypeRegistry,
	Plugin,
	Point,
} from "chart.js";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

const width = 600;
const height = 385;

export async function Grafico(
	data: number[],
	direction: "d" | "e",
	ossea: number[],
	hasOssea?: boolean,
) {
	const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
	const baseOptions: ChartOptions = {
		scales: {
			y: {
				min: -10,
				max: 120,
				grid: { color: "#ccc" },
			},
			x: {
				grid: { color: "#ccc" },
			},
		},
		animation: false,
		responsive: false,
		plugins: {},
	};
	const labels = [
		"0",
		"250",
		"500",
		"1000",
		"2000",
		"3000",
		"4000",
		"6000",
		"8000",
	];

	const arrowPlugin: Plugin = {
		id: "arrowPlugin",
		afterDatasetsDraw: (chart) => {
			const { ctx } = chart;
			const meta = chart.getDatasetMeta(1);
			ctx.save();
			meta.data.forEach((point: any) => {
				if (point.skip) return;
				console.log(point);
				const { x, y } = point.tooltipPosition(true);
				ctx.font = "bold 14px Arial";
				ctx.fillStyle = direction === "d" ? "red" : "blue";
				ctx.fillText(
					direction === "d" ? "<" : ">",
					x + (direction === "e" ? -15 : 10),
					y,
				);
			});
			ctx.restore();
		},
	};

	const datasets: ChartDataset<
		keyof ChartTypeRegistry,
		(number | [number, number] | Point | BubbleDataPoint | null)[]
	>[] = [
		{
			label: `Via Aérea`,
			data: data,
			pointBackgroundColor: "white",
			pointBorderColor: direction === "e" ? "blue" : "red",
			borderColor: direction === "e" ? "blue" : "red",
			pointStyle: direction === "e" ? "crossRot" : "circle",
			pointRadius: 7,
			borderDash: direction === "e" ? [5, 5] : undefined,
			pointHoverRadius: 10,
		},
	];

	if (hasOssea)
		datasets.push({
			label: `Via Ossea ${direction === "d" ? "<" : ">"}`,
			data: [null, null, ...ossea],
			borderColor: "transparent", // linha invisível
			backgroundColor: "transparent", // sem preenchimento
			pointRadius: 0, // não renderiza bolinhas
			pointHoverRadius: 0, // não mostra nada no hover
			borderWidth: 0, // sem borda de linha
		});

	const buffer = await chartJSNodeCanvas.renderToBuffer({
		type: "line",
		data: {
			labels,
			datasets,
		},
		options: baseOptions,
		plugins: ossea ? [arrowPlugin] : [],
	});

	return buffer;
}
