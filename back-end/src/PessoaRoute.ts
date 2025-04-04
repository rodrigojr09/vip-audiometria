import { FastifyInstance } from "fastify";
import { Socket } from "socket.io";
import DataProvider from "./DataProvider";

export default function DataRoute(fastify: FastifyInstance) {
	const provider = new DataProvider();
	fastify
		.get("/get", async (request, reply) => {
			const { id } = request.query as any;
			const data = await provider.getData(id);
			return data;
		})
		.post("/create", async (request, reply) => {
			const data = request.body as any;
			const result = await provider.createData(data);
			reply.status(201);
		})
		.put("/update", async (request, reply) => {
			const data = request.body as any;
			const result = await provider.updateData(data);
			reply.status(201);
		})
		.delete("/delete", async (request, reply) => {
			const data = request.query as any;
			console.log(request.query);
			const result = await provider.deleteData(data.id);
			reply.status(201);
		})
		.get("/download", async (request, reply) => {
			const { id, type } = request.query as any;
			const data = await provider.downloadData(id, type);
			return true;
		});
}
