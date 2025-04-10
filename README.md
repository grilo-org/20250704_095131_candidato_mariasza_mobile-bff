# Mottu Mobile BFF

Backend For Frontend (BFF) desenvolvido com NestJS, integrando APIs públicas para fornecer dados de forma estruturada e otimizada para aplicações cliente.

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) – estrutura modular e escalável
- [Axios](https://axios-http.com/) – cliente HTTP para chamadas externas
- TypeScript – tipagem segura
- Node.js – ambiente de execução

---

## 🔌 APIs Integradas

- [The Cat API](https://thecatapi.com/)
- [Rick and Morty API](https://rickandmortyapi.com/)

---

## 🧠 Decisões Técnicas

- **Estrutura modular por recurso**, seguindo o padrão do NestJS (`resources/`) para manter o código coeso e de fácil navegação.
- **Clean Architecture aplicada de forma pragmática**, respeitando o escopo do projeto:
  - Controllers lidam com a entrada HTTP.
  - Services funcionam como _use-cases_, centralizando a lógica de aplicação.
  - As integrações com APIs externas foram extraídas para arquivos `*-api.service.ts` dentro de cada recurso, promovendo baixo acoplamento.
- Criação de um módulo genérico `HttpModule` dentro de `shared/http`, responsável por centralizar as chamadas HTTP usando Axios, facilitando manutenção, testes e extensões futuras (como interceptors ou retries).
- Inclusão de suporte a **Docker** e **Docker Compose**, para facilitar o ambiente de desenvolvimento, isolamento e execução do projeto.
- Organização enxuta: evitamos estruturas com camadas excessivas para manter a simplicidade, sem abrir mão dos princípios de Clean Architecture.
- Implementação de um `HttpService` genérico com a função `makeRequest`, que permite realizar chamadas HTTP com flexibilidade de método, headers, body, query params e timeout. Isso facilita o reaproveitamento e centraliza o tratamento de erros.
- Uso de variáveis de ambiente com o pacote `@nestjs/config`, permitindo configurar URLs externas e outros parâmetros de forma segura e flexível via `.env`.

---

## 📁 Estrutura de Pastas

```bash
src/
├── main.ts
├── app.module.ts
├── resources/           # Recursos/domínios da aplicação
│   ├── cats/
│   ├── rickandmorty/
│   └── pairs/
└── shared/
    └── http/            # Módulo genérico de chamadas HTTP
```

---

## 📄 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
THE_CAT_API_BASE_URL=https://api.thecatapi.com/v1
RICK_AND_MORTY_API_BASE_URL=https://rickandmortyapi.com/api
```

Essas variáveis são injetadas automaticamente via `@nestjs/config` e utilizadas nas integrações externas.

---

## 📦 Como rodar o projeto

```bash
# 1. Clone o repositório
git clone <URL_DO_SEU_REPOSITORIO_PRIVADO>
cd im-mottu-mobile-bff
```

```bash
# 2. Instale as dependências
npm install
```

```bash
# 3. Rode o projeto em modo de desenvolvimento
npm run start:dev
```

```bash
# 4. Acesse o projeto no navegador
http://localhost:3000
```

---

## 🐳 Como rodar com Docker

```bash
# 1. Build da imagem
docker-compose build
```

```bash
# 2. Suba os containers
docker-compose up
```

```bash
# 3. Acesse o projeto no navegador
http://localhost:3000
```

---

## 🧪 Como executar os testes

```bash
# Testes unitários
npm run test
```

```bash
# Testes de um recurso específico
npm run test cats
npm run test rickandmorty
npm run test pairs
```

```bash
# Testes e2e
npm run test:e2e
```

---

## 📚 Documentação da API

A documentação Swagger está disponível após iniciar o projeto:

```
http://localhost:3000/docs
```

---
