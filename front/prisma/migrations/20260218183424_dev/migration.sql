/*
  Warnings:

  - You are about to drop the column `empresa` on the `Exame` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exame" DROP COLUMN "empresa",
ADD COLUMN     "empresaId" TEXT;

-- CreateTable
CREATE TABLE "Empresa" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "funcoes" TEXT[],

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
