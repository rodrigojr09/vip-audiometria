import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    async function unificarPessoasDuplicadas() {
        // 1️⃣ Buscar todas as pessoas
        const pessoas = await prisma.pessoa.findMany();

        // 2️⃣ Agrupar por CPF
        const agrupadoPorCpf = pessoas.reduce((acc, pessoa) => {
            if (!acc[pessoa.cpf]) acc[pessoa.cpf] = [];
            acc[pessoa.cpf].push(pessoa);
            return acc;
        }, {} as Record<string, typeof pessoas>);

        // 3️⃣ Filtrar apenas CPFs duplicados
        const duplicados = Object.values(agrupadoPorCpf).filter(
            (grupo) => grupo.length > 1
        );

        for (const grupo of duplicados) {
            // Escolhe o primeiro como principal
            const principal = grupo[0];
            const duplicadas = grupo.slice(1);

            console.log(`Unificando CPF ${principal.cpf}`);

            await prisma.$transaction(async (tx) => {
                for (const pessoa of duplicadas) {
                    // 4️⃣ Atualiza exames
                    await tx.exame.updateMany({
                        where: { pessoaId: pessoa.id },
                        data: { pessoaId: principal.id },
                    });

                    // 5️⃣ Remove pessoa duplicada
                    await tx.pessoa.delete({
                        where: { id: pessoa.id },
                    });
                }
            });
        }

        console.log("Unificação concluída.");
    }

    unificarPessoasDuplicadas()
        .catch(console.error)
        .finally(() => prisma.$disconnect());

}