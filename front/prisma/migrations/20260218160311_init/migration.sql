-- CreateTable
CREATE TABLE "Exame" (
    "_id" TEXT NOT NULL,
    "dataExame" TEXT NOT NULL,
    "tipoExame" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "resultados" JSONB,
    "pessoaId" TEXT,

    CONSTRAINT "Exame_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Medica" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,

    CONSTRAINT "Medica_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Config" (
    "_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_key_key" ON "Config"("key");

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
