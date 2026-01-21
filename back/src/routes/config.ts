import type { FastifyInstance } from "fastify";
import { createMedica, deleteMedica, get, getMedicas, update } from "../controllers/config";

export default function configRoute(fastify: FastifyInstance) {
	fastify.get("/get", get);
    fastify.put("/update", update);
    fastify.get("/medicas", getMedicas);
    fastify.delete("/medicas/delete", deleteMedica);
    fastify.post("/medicas/create", createMedica);
}
