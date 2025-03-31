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
const electron_1 = require("electron");
const cors_1 = __importDefault(require("@fastify/cors"));
const socket_io_1 = require("socket.io");
const DataRoute_1 = __importDefault(require("./DataRoute"));
const DataProvider_1 = __importDefault(require("./DataProvider"));
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
fastify.register(DataRoute_1.default, { prefix: "/data" });
const io = new socket_io_1.Server(fastify.server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("Novo cliente conectado", socket.id);
    const provider = new DataProvider_1.default();
    socket.on("get", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Emitindo dados");
        const dados = yield provider.getData();
        socket.emit("data", dados);
    }));
});
electron_1.app.on("ready", () => {
    fastify.listen({ host: "0.0.0.0", port: 48732 }, () => {
        console.log("Servidor rodando em http://0.0.0.0:48732");
    });
});
electron_1.app.on("window-all-closed", () => {
    io.close();
    fastify.close();
    electron_1.app.exit();
});
