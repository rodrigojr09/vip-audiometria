import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../lib/prisma";
import { Medica } from "../../prisma/client";

async function get(req: FastifyRequest, res: FastifyReply) {
	const calibracao = await prisma.config.findFirst({
		where: {
			key: "calibracao",
		},
	});
	const medicas = await prisma.medica.findMany();

	res.status(200).send({ calibracao: calibracao?.value || "", medicas });
}

async function update(req: FastifyRequest, res: FastifyReply) {
	const { key, value } = req.query as { key: string; value: string };
	const result = await prisma.config.upsert({
		where: {
			key,
		},
		update: {
			value,
		},
		create: {
			key,
			value,
		},
	});
	res.status(200).send(result);
}

async function getMedicas(req: FastifyRequest, res: FastifyReply) {
	const medicas = await prisma.medica.findMany();
	res.status(200).send(medicas);
}

async function createMedica(req: FastifyRequest, res: FastifyReply) {
	const medica = req.body as Medica;
	const result = await prisma.medica.create({
		data: { nome: medica.nome, documento: medica.documento },
	});
	res.status(200).send(result);
}

async function deleteMedica(req: FastifyRequest, res: FastifyReply) {
	const medica = req.query as Medica;
	const result = await prisma.medica.delete({
		where: {
			id: medica.id,
		},
	});
	res.status(200).send(result);
}

export { get, update, getMedicas, createMedica, deleteMedica };
