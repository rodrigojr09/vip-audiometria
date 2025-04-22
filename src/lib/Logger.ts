import { app } from "electron";
import fs from "fs";
import path from "path";
import { dados } from "./dados";

type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
	public logDir: string = dados.paths.logs;

	constructor() {
		if (!fs.existsSync(this.logDir)) {
			fs.mkdirSync(this.logDir, { recursive: true });
		}
	}

	private formatMessage(level: LogLevel, message: string): string {
		const timestamp = new Date().toISOString();
		return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
	}

	private writeToFile(level: LogLevel, message: string): void {
		const date = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
		const filename = path.join(this.logDir, `${date}.log`);
		const fullMessage = this.formatMessage(level, message) + "\n";

		fs.appendFileSync(filename, fullMessage, "utf8");
	}

	private log(level: LogLevel, message: string): void {
		const formatted = this.formatMessage(level, message);

		switch (level) {
			case "info":
				console.info(formatted);
				break;
			case "warn":
				console.warn(formatted);
				break;
			case "error":
				console.error(formatted);
				break;
			case "debug":
				console.debug(formatted);
				break;
		}

		this.writeToFile(level, message);
	}

	info(message: string) {
		this.log("info", message);
	}

	warn(message: string) {
		this.log("warn", message);
	}

	error(message: string) {
		this.log("error", message);
	}

	debug(message: string) {
		this.log("debug", message);
	}
}

export const logger = new Logger();
