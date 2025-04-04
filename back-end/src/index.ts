import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import { app, BrowserWindow, nativeImage } from "electron";
import fastifyCors from "@fastify/cors";
import { Server } from "socket.io";
import DataRoute from "./PessoaRoute";
import DataProvider from "./DataProvider";
import { existsSync, readFileSync } from "fs";
import url from "url";
import path from "path";

const isDev = process.env.NODE_ENV === "development"; // Verifica o ambiente

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

fastify.register(DataRoute, { prefix: "/pessoa" });

fastify.register(FastifyStatic, {
	root: path.join(__dirname, "../views"),
	prefix: "/",
});

fastify.setNotFoundHandler((req, reply) => {
	const requestedPath = path.join(__dirname, "../views", req.url + ".html");

	// Verifica se o arquivo HTML existe e serve ele
	if (existsSync(requestedPath)) {
		return reply.type("text/html").send(readFileSync(requestedPath));
	}

	// Se não existir, retorna erro 404
	reply.code(404).send("Página não encontrada");
});

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

let win: BrowserWindow | null = null;

app.on("ready", () => {
	win = new BrowserWindow({
		icon: nativeImage.createFromPath(
			path.join(__dirname, "assets", "icon.png")
		),
		title: "VIP Audiometria",
		show: false, // Evita abrir antes de carregar
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	// Inicia o servidor Fastify antes de carregar a URL
	fastify.listen({ host: "0.0.0.0", port: 48732 }, (err) => {
		if (err) {
			console.error("Erro ao iniciar o servidor:", err);
			app.quit();
			return;
		}
		console.log("Servidor rodando em http://0.0.0.0:48732");

		// Depois que o servidor iniciar, carregar a página no Electron
		if (isDev) win?.loadURL("http://localhost:48731");
		else win?.loadURL("http://localhost:48732/");
		win?.maximize();
		win?.show();
	});
});
app.on("window-all-closed", () => {
	io.close();
	fastify.close();
	app.exit();
});
