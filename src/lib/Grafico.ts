import { ChartOptions } from "chart.js";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

const width = 600;
const height = 385;

export async function Grafico(
	data: number[],
	direction: "d" | "e",
	ossea?: boolean
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

	const arrowPlugin = {
		id: "arrowPlugin",
		afterDatasetsDraw: (chart: any) => {
			const { ctx } = chart;
			const meta = chart.getDatasetMeta(0);
			ctx.save();
			meta.data.forEach((point: any) => {
				const { x, y } = point.tooltipPosition();
				ctx.font = "bold 14px Arial";
				ctx.fillStyle = direction === "d" ? "red" : "blue";
				ctx.fillText(direction === "d" ? ">" : "<", x + (direction === "e" ? -15 : 10) , y);
			});
			ctx.restore();
		},
	};

	const buffer = await chartJSNodeCanvas.renderToBuffer({
		type: "line",
		data: {
			labels,
			datasets: [
				{
					label:
						"Orelha " +
						(direction === "d" ? "Direita" : "Esquerda"),
					data: data,
					pointBackgroundColor: "white",
					pointBorderColor: direction === "e" ? "blue" : "red",
					borderColor: direction === "e" ? "blue" : "red",
					pointStyle: direction === "e" ? "crossRot" : "circle",
					pointRadius: 7,
					borderDash: direction === "e" ? [5, 5] : undefined,
					pointHoverRadius: 10,
				},
			],
		},
		options: baseOptions,
		plugins: ossea ? [arrowPlugin] : [],
	});

	return buffer;
}
