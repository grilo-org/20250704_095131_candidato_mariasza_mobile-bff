# 😼🚀 I'm Mottu BFF Test 🛸🐾

**Teste prático para desenvolvedores Backend com NestJS**

Este teste é separado em **3 níveis de dificuldade**, assim como no nosso teste para Flutter. Você pode desenvolver o teste atendendo apenas a um nível, ou todos.

---

## 🔧 Etapas iniciais (obrigatórias para todos os níveis)

1. Faça um fork deste repositório de teste (privado) e adicione os seguintes usuários como colaboradores: `@brunosmm`, `@BetoMottu`, `@moreirawebmaster`, `@jeanchrocha`.
2. Crie um projeto NestJS com o namespace: `@mottu/bff`.
3. Consuma as seguintes APIs públicas:
    - [The Cat API](https://developers.thecatapi.com/)
    - [Rick and Morty API](https://rickandmortyapi.com/documentation)
4. Documente no README:
    - Como rodar o projeto
    - Quais níveis foram implementados
    - Descrição das decisões técnicas tomadas
    - Como executar os testes
    - Como testar as rotas

---

## ✅ NÍVEL 1 — nome da branch: `level_1`

- Executar todas as etapas iniciais
- Estruturar o projeto em módulos: `cats`, `rickandmorty`, `pairs`
- Criar uma rota:
    
    ```
    bash
    CopiarEditar
    GET /v1/pairs
    
    ```
    
    Que retorna um personagem aleatório da Rick and Morty API junto com um gato aleatório da The Cat API.
    
    - Exemplo de resposta:
        
        ```json
        json
        CopiarEditar
        {
          "character": {
            "name": "Morty Smith",
            "image": "https://...",
            "species": "Human"
          },
          "cat": {
            "id": "b1c",
            "image": "https://..."
          }
        }
        
        ```
        
- Usar `HttpModule` do NestJS para consumir as APIs externas
- Implementar tratamento de erro para falhas de rede ou dados inválidos
- Criar DTOs para tipagem das respostas

---

## ✅ NÍVEL 2 — nome da branch: `level_2`

- Tudo do **Nível 1**, mais:
- Criar filtros para a rota `/v1/pairs/search`, como:
    - `characterName`: nome (ou parte) do personagem
    - `catBreed`: filtro por raça do gato (disponível na The Cat API)
- Criar a rota:
    
    ```
    bash
    CopiarEditar
    GET /v1/breeds
    
    ```
    
    Que retorna as raças disponíveis de gatos
    
- Implementar **cache** (em memória ou Redis) para as chamadas das APIs públicas
- Separar `services` e `controllers` para cada módulo (`RickAndMorty`, `Cats`, `Pairs`)
- Criar ao menos 1 teste unitário para cada service

---

## ✅ NÍVEL 3 — nome da branch: `level_3`

- Tudo do **Nível 2**, mais:
- Adicionar paginação para a listagem `/v1/pairs`
- Criar:
    
    ```
    bash
    CopiarEditar
    POST /v1/pairs/favorite
    
    ```
    
    Para salvar um vínculo favorito (em memória ou SQLite)
    
- Criar:
    
    ```
    bash
    CopiarEditar
    GET /v1/pairs/favorites
    
    ```
    
    Para listar os pares salvos
    
- Adicionar documentação via **Swagger** para todas as rotas
- Implementar testes de integração

---

## 💎 Pontos Extras (opcional)

- Utilizar **Clean Architecture** ou **DDD**
- Usar **Docker** para setup e execução
- Adicionar um **Logger customizado**
- Middleware global de **tratamento de erros**
- Job/Worker para atualização periódica do cache
- Deploy em plataforma gratuita (Render, Vercel, Fly.io, etc)

---

## ❌ O que **não** fazer

- Um único commit com tudo
- Copiar código de outro repositório (a gente percebe)
- Usar IA para escrever o código — queremos ver seu raciocínio
