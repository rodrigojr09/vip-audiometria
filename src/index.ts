import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import { app, BrowserWindow, nativeImage } from "electron";
import fastifyCors from "@fastify/cors";
import path from "path";
import { existsSync, readFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

import createRoute from "./pessoa/create";
import getRoute from "./pessoa/get";
import updateRoute from "./pessoa/update";
import deleteRoute from "./pessoa/delete";
import downloadRoute from "./pessoa/download";
import { logger } from "./lib/Logger";
import moment from "./lib/moment";
import MainWindow from "./lib/Windows";

const isDev = process.env.NODE_ENV === "development";

const fastify = Fastify({
	logger: {
		file: path.join(
			logger.logDir,
			"fastify-" + moment().format("HH-mm-DD-MM-YYYY") + ".log"
		),
	}, // Desativa o logger nativo
});

fastify.addHook("onRequest", (request, _, done) => {
	logger.info(
		`Método: ${request.method}, URL: ${request.url}, IP: ${request.ip}`
	);
	done();
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
	if (existsSync(requestedPath)) {
		return reply.type("text/html").send(readFileSync(requestedPath));
	}
	reply.code(404).send("Página não encontrada");
});

fastify.post("/pessoa/create", createRoute);
fastify.get("/pessoa/get", getRoute);
fastify.put("/pessoa/update", updateRoute);
fastify.delete("/pessoa/delete", deleteRoute);
fastify.get("/pessoa/download", downloadRoute);

let win: BrowserWindow | null = null;

app.on("ready", () => {
	win = MainWindow();

	fastify.listen({ host: "0.0.0.0", port: 7961 }, (err) => {
		if (err) {
			logger.error("Erro ao iniciar o servidor: " + err.message);
			app.quit();
			return;
		}
		logger.info("Servidor rodando em http://0.0.0.0:7961");

		if (isDev) win?.loadURL("http://localhost:3000");
		else win?.loadURL("http://localhost:7961/");
		win?.maximize();
		win?.show();
	});
});

app.on("window-all-closed", () => {
	fastify.close();
	app.exit();
});
