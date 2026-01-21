import type { FastifyInstance } from "fastify";
import { create, download, get, remove, update } from "../controllers/pessoa";

export default function pessoaRoute(fastify: FastifyInstance) {
	fastify.post("/create", create);
	fastify.get("/get", get);
	fastify.put("/update", update);
	fastify.delete("/delete", remove);
	fastify.get("/download", download);
}
