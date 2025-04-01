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
exports.default = DataRoute;
const DataProvider_1 = __importDefault(require("./DataProvider"));
function DataRoute(fastify) {
    const provider = new DataProvider_1.default();
    fastify
        .get("/get", (request, reply) => __awaiter(this, void 0, void 0, function* () {
        const { id } = request.query;
        const data = yield provider.getData(id);
        return data;
    }))
        .post("/create", (request, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = request.body;
        const result = yield provider.createData(data);
        reply.status(201);
    }))
        .put("/update", (request, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = request.body;
        const result = yield provider.updateData(data);
        reply.status(201);
    }))
        .delete("/delete", (request, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = request.query;
        console.log(request.query);
        const result = yield provider.deleteData(data.id);
        reply.status(201);
    }))
        .get("/download", (request, reply) => __awaiter(this, void 0, void 0, function* () {
        const { id, type } = request.query;
        const data = yield provider.downloadData(id, type);
        if (data) {
            return data;
        }
        else
            return { error: "Arquivo nao encontrado" };
    }));
}
