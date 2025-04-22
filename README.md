# VIP Audiometria

**VIP Audiometria** é um sistema desenvolvido para facilitar o gerenciamento de exames audiométricos, permitindo o preenchimento e a organização de resultados e requisições de forma simples e eficiente. O sistema combina uma aplicação desktop (Electron + Fastify) com uma interface moderna construída em Next.js.

---

## 🚀 Funcionalidades

- Criação, leitura, atualização e exclusão de registros de pacientes.
- Geração automática de documentos `.docx` (requisição e resultado de exame).
- Download e abertura automática dos arquivos gerados.
- Interface amigável e responsiva.
- Logs detalhados armazenados automaticamente por dia.

---

## 📁 Estrutura de Diretórios

```bash
.
├── assets/              # Arquivos visuais ou de mídia (ícones, imagens etc.)
├── prisma/
│   ├── client/          # Cliente Prisma compilado
│   └── schema.prisma    # Arquivo de schema do Prisma
├── src/
│   ├── pessoa/          # Rotas para gerenciamento do banco de dados (CRUD)
│   ├── lib/             # Módulos auxiliares (Logger, DataProvider, etc.)
│   └── index.ts         # Arquivo central que integra Electron e Fastify
├── front/               # Projeto Next.js (interface frontend)
├── .env                 # Variáveis de ambiente
├── package.json         # Dependências e scripts do projeto
└── tsconfig.json        # Configuração do TypeScript
```

---

## 🛠️ Instalação

### Pré-requisitos

- Node.js >= 18
- Yarn ou npm
- Prisma CLI: `npm install -g prisma`
- Banco de dados MongoDB (padrão) ou qualquer outro suportado pelo Prisma

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/vip-audiometria.git
cd vip-audiometria

# Instale as dependências
npm install

# Gere os arquivos Prisma
npx prisma generate
```

---

## ▶️ Executando o Projeto

### Backend + Electron

```bash
# Inicie a aplicação desktop com backend integrado
npm run dev
```

### Frontend (Next.js)

```bash
cd front
npm install
npm run dev
```

---

## 📦 Scripts Úteis

| Comando | Descrição |
|--------|------------|
| `npm run dev` | Inicia o Electron com Fastify em modo desenvolvimento |
| `npm run build` | Compila o projeto para produção |
| `npx prisma generate` | Gera o cliente Prisma |
| `npm run start` | Inicia o projeto em modo produção |

---

## 🧰 Tecnologias Utilizadas

- [Electron](https://www.electronjs.org/)
- [Fastify](https://www.fastify.io/)
- [Next.js](https://nextjs.org/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).