import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import FastifyStatic from "@fastify/static";
import { app, BrowserWindow, nativeImage, shell } from "electron";
import fastifyCors from "@fastify/cors";
import path from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config()

import createRoute from "./pessoa/create";
import getRoute from "./pessoa/get";
import updateRoute from "./pessoa/update";
import deleteRoute from "./pessoa/delete";
import downloadRoute from "./pessoa/download";

const isDev = process.env.NODE_ENV === "development"; // Verifica o ambiente

const fastify = Fastify({
	logger: true,
});

fastify.register(fastifyCors, {
	origin: "*",
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

fastify.post("/pessoa/create", createRoute);
fastify.get("/pessoa/get", getRoute);
fastify.put("/pessoa/update", updateRoute);
fastify.delete("/pessoa/delete", deleteRoute);
fastify.get("/pessoa/download", downloadRoute);

let win: BrowserWindow | null = null;

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
	fastify.listen({ host: "0.0.0.0", port: 7961 }, (err) => {
		if (err) {
			console.error("Erro ao iniciar o servidor:", err);
			app.quit();
			return;
		}
		console.log("Servidor rodando em http://0.0.0.0:7961");

		// Depois que o servidor iniciar, carregar a página no Electron
		if(isDev) win?.loadURL("http://localhost:3000");
		else win?.loadURL("http://localhost:7961/");
		win?.maximize();
		win?.show();
	});
});

app.on("window-all-closed", () => {
	fastify.close();
	app.exit();
});
