import Fastify from "fastify";
import { app } from "electron";
import fastifyCors from "@fastify/cors";
import { Server } from "socket.io";
import DataRoute from "./DataRoute";
import DataProvider from "./DataProvider";

const fastify = Fastify({
	logger: true,
});

fastify.register(fastifyCors, {
	origin: "*",
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"Access-Control-Allow-Origin",
	],
	methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.register(DataRoute, { prefix: "/data" });
const io = new Server(fastify.server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("Novo cliente conectado", socket.id);
	const provider = new DataProvider();
	socket.on("get", async () => {
		console.log("Emitindo dados");
		const dados = await provider.getData();
		socket.emit("data", dados);
	});
});

app.on("ready", () => {
	fastify.listen({ host: "0.0.0.0", port: 48732 }, () => {
		console.log("Servidor rodando em http://0.0.0.0:48732");
	});
});

app.on("window-all-closed", () => {
	io.close();
	fastify.close();
	app.exit();
});
