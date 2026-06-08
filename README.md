# 🎴 Figuratti API

Backend da aplicação **Figuratti**, uma plataforma para gerenciamento de coleções de figurinhas inspirada nos álbuns da Copa do Mundo FIFA 2026.

O projeto foi desenvolvido utilizando **NestJS**, **TypeORM** e **MySQL**, com foco em boas práticas de arquitetura backend, autenticação segura e modelagem relacional.

---

# 🚀 Tecnologias Utilizadas

* NestJS
* TypeORM
* MySQL
* JWT (JSON Web Token)
* Passport
* bcrypt
* class-validator
* @nestjs/config

---

# 🎯 Objetivo do Projeto

O Figuratti permite que usuários:

* Criem uma conta
* Realizem login autenticado com JWT
* Consultem seleções participantes
* Consultem figurinhas do álbum
* Gerenciem sua coleção pessoal
* Marquem figurinhas como:

  * Tenho
  * Falta
  * Repetida
* Visualizem estatísticas da coleção

---

# 🏗️ Arquitetura

O projeto segue a arquitetura modular recomendada pelo NestJS.

```text
src/
├── auth/
├── usuario/
├── selecao/
├── figurinha/
├── colecao/
├── seed/
├── app.module.ts
└── main.ts
```

---

# 📦 Módulos

## AuthModule

Responsável por:

* Login
* Geração de JWT
* Validação de credenciais
* Proteção de rotas

---

## UsuarioModule

Responsável por:

* Cadastro de usuários
* Busca de usuários
* Atualização de dados
* Remoção de usuários

---

## SelecaoModule

Responsável por:

* Cadastro de seleções
* Consulta de seleções
* Atualização de seleções
* Remoção de seleções

---

## FigurinhaModule

Responsável por:

* Cadastro de figurinhas
* Consulta de figurinhas
* Atualização de figurinhas
* Remoção de figurinhas

---

## ColecaoModule

Responsável por:

* Gerenciamento da coleção do usuário
* Controle de status das figurinhas
* Consulta de repetidas
* Estatísticas da coleção

---

# 🗄️ Banco de Dados

## Usuario

| Campo      | Tipo      |
| ---------- | --------- |
| id         | uuid      |
| nome       | varchar   |
| email      | varchar   |
| senha_hash | varchar   |
| role       | enum      |
| createdAt  | timestamp |
| updatedAt  | timestamp |

---

## Selecao

| Campo       | Tipo      |
| ----------- | --------- |
| id          | int       |
| nome        | varchar   |
| codigoFifa  | varchar   |
| bandeiraUrl | varchar   |
| createdAt   | timestamp |
| updatedAt   | timestamp |

---

## Figurinha

| Campo       | Tipo      |
| ----------- | --------- |
| id          | int       |
| numero      | int       |
| nomeJogador | varchar   |
| posicao     | varchar   |
| especial    | boolean   |
| categoria   | varchar   |
| selecao_id  | int       |
| createdAt   | timestamp |
| updatedAt   | timestamp |

---

## ColecaoFigurinha

| Campo        | Tipo      |
| ------------ | --------- |
| id           | uuid      |
| usuario_id   | uuid      |
| figurinha_id | int       |
| status       | enum      |
| quantidade   | int       |
| createdAt    | timestamp |
| updatedAt    | timestamp |

---

# 🔗 Relacionamentos

## Seleção → Figurinhas

```text
Selecao 1:N Figurinha
```

Uma seleção possui várias figurinhas.

---

## Usuário → Coleção

```text
Usuario 1:N ColecaoFigurinha
```

Um usuário possui vários registros de coleção.

---

## Figurinha → Coleção

```text
Figurinha 1:N ColecaoFigurinha
```

Uma figurinha pode estar presente na coleção de vários usuários.

---

# 🔐 Autenticação

A autenticação é realizada utilizando JWT.

Após o login, o usuário recebe um token:

```json
{
  "token": "jwt-token"
}
```

As rotas protegidas exigem:

```http
Authorization: Bearer SEU_TOKEN
```

---

# 📡 Endpoints

## Autenticação

| Método | Endpoint    |
| ------ | ----------- |
| POST   | /auth/login |

---

## Usuários

| Método | Endpoint      |
| ------ | ------------- |
| POST   | /usuarios     |
| GET    | /usuarios     |
| GET    | /usuarios/:id |
| PUT    | /usuarios/:id |
| DELETE | /usuarios/:id |

---

## Seleções

| Método | Endpoint      |
| ------ | ------------- |
| POST   | /selecoes     |
| GET    | /selecoes     |
| GET    | /selecoes/:id |
| PATCH  | /selecoes/:id |
| DELETE | /selecoes/:id |

---

## Figurinhas

| Método | Endpoint        |
| ------ | --------------- |
| POST   | /figurinhas     |
| GET    | /figurinhas     |
| GET    | /figurinhas/:id |
| PATCH  | /figurinhas/:id |
| DELETE | /figurinhas/:id |

---

## Coleção

### Atualizar status da figurinha

```http
PATCH /colecao/:figurinhaId
```

Exemplo:

```json
{
  "status": "TENHO"
}
```

ou

```json
{
  "status": "REPETIDA"
}
```

---

### Listar coleção

```http
GET /colecao
```

---

### Listar repetidas

```http
GET /colecao/repetidas
```

---

### Estatísticas da coleção

```http
GET /colecao/stats
```

Exemplo de resposta:

```json
{
  "total": 640,
  "tenho": 320,
  "faltam": 320,
  "repetidas": 25,
  "percentual": 50
}
```

---

# 🌱 Seed

O projeto possui seed para popular:

* Seleções
* Figurinhas

Executar:

```bash
npx ts-node src/seed/seed.ts
```

---

# ⚙️ Executando o Projeto

## Instalar dependências

```bash
npm install
```

## Configurar variáveis de ambiente

Crie um arquivo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=db_figuratti

JWT_SECRET=figuratti_secret
```

## Executar em desenvolvimento

```bash
npm run start:dev
```

---

# 📋 Regras de Negócio

* O email deve ser único
* Senhas são criptografadas com bcrypt
* JWT possui expiração de 7 dias
* Usuários só acessam sua própria coleção
* Cada usuário pode possuir apenas um registro por figurinha
* O status da figurinha pode ser:

  * TENHO
  * FALTA
  * REPETIDA
* Estatísticas são calculadas automaticamente

---

# 📈 Status do Projeto

* ✅ Autenticação JWT
* ✅ Cadastro de usuários
* ✅ CRUD de seleções
* ✅ CRUD de figurinhas
* ✅ Seed de dados
* ✅ Coleção de figurinhas
* ✅ Estatísticas da coleção
* 🚧 Swagger
* 🚧 Deploy
* 🚧 Frontend React

---

# 📄 Licença

Este projeto está sob a licença MIT.


