import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import FastifyStatic from "@fastify/static";
import { app, BrowserWindow, nativeImage, shell } from "electron";
import fastifyCors from "@fastify/cors";
import path from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";

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

let win: BrowserWindow | null = null;

fastify.get("/upload", async (req: FastifyRequest, res: FastifyReply) => {
	const { file, name } = req.query as {
		file: string | undefined;
		name: string | undefined;
	};
	if (!file || !name)
		return res.status(400).send({ error: "Arquivo não fornecido" });
	const buffer = Buffer.from(file, "base64");
	const filePath = path.join(app.getPath("documents"), "Audiometria", name);
	writeFileSync(filePath, buffer);
	shell.openPath(filePath);
	return res.status(200).send({ message: "Arquivo enviado com sucesso" });
});

app.on("ready", () => {
	win = new BrowserWindow({
		icon: nativeImage.createFromPath(
			path.join(__dirname, "../assets", "icon.png")
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
	fastify.close();
	app.exit();
});
