import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import { app, BrowserWindow, dialog, shell } from "electron";
import fastifyCors from "@fastify/cors";
import path from "path";
import { existsSync, readFileSync } from "fs";

import createRoute from "./pessoa/create";
import getRoute from "./pessoa/get";
import updateRoute from "./pessoa/update";
import deleteRoute from "./pessoa/delete";
import downloadRoute from "./pessoa/download";
import { logger } from "./lib/Logger";
import moment from "./lib/moment";
import { MainWindow, LoadingWindow } from "./lib/Windows";
import { GitHubRelease } from "./lib/Github";

const isDev = process.env.NODE_ENV === "development";

const git = new GitHubRelease("rodrigojr09", "vip-audiometria");
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
	credentials: true,
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

app.on("ready", async () => {
	const release = await git.getLatestRelease();
	fastify.listen({ host: "0.0.0.0", port: 7961 }, async (err) => {
		if (err) {
			logger.error("Erro ao iniciar o servidor: " + err.message);
			app.quit();
			return;
		}
		logger.info("Servidor rodando em http://0.0.0.0:7961");
		win = LoadingWindow(isDev);
		if (release.tagName !== "v" + app.getVersion()) {
			const filePath = await git.getLatestReleaseSetup();
			if (filePath) {
				shell.openPath(filePath);
			} else {
				shell.openExternal(
					"https://github.com/rodrigojr09/vip-audiometria/releases/latest"
				);
			}
			app.quit();
		} else {
			win.close();
			win = MainWindow(isDev);
		}
	});
});

app.on("window-all-closed", () => {
	fastify.close();
	app.exit();
});
