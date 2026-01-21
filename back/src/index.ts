import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import fastifyCors from "@fastify/cors";
import FastifyStatic from "@fastify/static";
import { app, type BrowserWindow, shell } from "electron";
import Fastify from "fastify";
import { GitHubRelease } from "./lib/Github";
import { logger } from "./lib/Logger";
import moment from "./lib/moment";
import { LoadingWindow, MainWindow } from "./lib/Windows";
import pessoaRoute from "./routes/pessoa";
import configRoute from "./routes/config";

const isDev = process.env.NODE_ENV === "development";

const git = new GitHubRelease("rodrigojr09", "vip-audiometria");
const fastify = Fastify({
	logger: {
		file: path.join(
			logger.logDir,
			`fastify-${moment().format("HH-mm-DD-MM-YYYY")}.log`,
		),
	}, // Desativa o logger nativo
});

fastify.register(fastifyCors, {
	origin: ["http://localhost:3000","https://vip-audiometria.vercel.app"],
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"Access-Control-Allow-Origin",
	],
});

fastify.register(pessoaRoute, { prefix: "/api/pessoa" });
fastify.register(configRoute, { prefix: "/api/config" });

let win: BrowserWindow | null = null;

app.on("ready", async () => {
	const release = await git.getLatestRelease();
	fastify.listen({ port: 7961 }, async (err) => {
		if (err) {
			logger.error(`Erro ao iniciar o servidor: ${err.message}`);
			app.quit();
			return;
		}
		logger.info("Servidor rodando em http://0.0.0.0:7961");
		win = LoadingWindow(isDev);

		if (!isDev && release.tagName !== `v${app.getVersion()}`) {
			const filePath = await git.getLatestReleaseSetup();
			if (filePath) {
				shell.openPath(filePath);
			} else {
				shell.openExternal(release.url);
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
