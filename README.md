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
# Testes de integração (e2e)
npm run test:e2e
```

---
