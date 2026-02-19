import { Prisma } from "@prisma/client"

export interface ResultadoType {
    od: string
    d250?: string
    d500?: string
    d1000?: string
    d2000?: string
    d3000?: string
    d4000?: string
    d6000?: string
    d8000?: string
    oe: string
    e250?: string
    e500?: string
    e1000?: string
    e2000?: string
    e3000?: string
    e4000?: string
    e6000?: string
    e8000?: string
    obs: string
    ossea?: ViaOssea
}

export interface ViaOssea {
    od: boolean
    d500?: string
    d1000?: string
    d2000?: string
    d3000?: string
    d4000?: string
    oe: boolean
    e500?: string
    e1000?: string
    e2000?: string
    e3000?: string
    e4000?: string
}


declare module "@prisma/client" {
    export * from "@prisma/client";
    export interface Exame extends Prisma.ExameGetPayload<{ include: { pessoa: true, empresa: true } }> {
        resultados?: ResultadoType;
        pessoa?: Pessoa
        empresa?: Empresa
    }
    export interface Pessoa extends Prisma.PessoaGetPayload<{ include: { exames: true } }> {
        exames?: Exame[]
    }
    export interface Empresa extends Prisma.EmpresaGetPayload<{ include: { exames: true } }> {
        exames?: Exame[]
    }

}