"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const static_1 = __importDefault(require("@fastify/static"));
const electron_1 = require("electron");
const cors_1 = __importDefault(require("@fastify/cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const isDev = process.env.NODE_ENV === "development"; // Verifica o ambiente
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.register(cors_1.default, {
    origin: "*",
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
});
fastify.register(static_1.default, {
    root: path_1.default.join(__dirname, "../views"),
    prefix: "/",
});
fastify.setNotFoundHandler((req, reply) => {
    const requestedPath = path_1.default.join(__dirname, "../views", req.url + ".html");
    // Verifica se o arquivo HTML existe e serve ele
    if ((0, fs_1.existsSync)(requestedPath)) {
        return reply.type("text/html").send((0, fs_1.readFileSync)(requestedPath));
    }
    // Se não existir, retorna erro 404
    reply.code(404).send("Página não encontrada");
});
let win = null;
fastify.get("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file, name } = req.query;
    if (!file || !name)
        return res.status(400).send({ error: "Arquivo não fornecido" });
    const buffer = Buffer.from(file, "base64");
    const filePath = path_1.default.join(electron_1.app.getPath("documents"), "Audiometria", name);
    (0, fs_1.writeFileSync)(filePath, buffer);
    electron_1.shell.openPath(filePath);
    return res.status(200).send({ message: "Arquivo enviado com sucesso" });
}));
electron_1.app.on("ready", () => {
    win = new electron_1.BrowserWindow({
        icon: electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, "../assets", "icon.png")),
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
            electron_1.app.quit();
            return;
        }
        console.log("Servidor rodando em http://0.0.0.0:48732");
        // Depois que o servidor iniciar, carregar a página no Electron
        if (isDev)
            win === null || win === void 0 ? void 0 : win.loadURL("http://localhost:48731");
        else
            win === null || win === void 0 ? void 0 : win.loadURL("http://localhost:48732/");
        win === null || win === void 0 ? void 0 : win.maximize();
        win === null || win === void 0 ? void 0 : win.show();
    });
});
electron_1.app.on("window-all-closed", () => {
    fastify.close();
    electron_1.app.exit();
});
