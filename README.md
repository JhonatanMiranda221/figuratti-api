# 🎴 Figuratti API

Backend da aplicação **Figuratti** — plataforma para colecionadores gerenciarem seu álbum de figurinhas da **FIFA World Cup 2026**.

---

## 💡 Sobre o projeto

O Figuratti permite que cada usuário crie sua conta e gerencie sua coleção de figurinhas Panini da Copa do Mundo 2026 — marcando quais tem, quais faltam e quais estão repetidas, com estatísticas completas da coleção.

O projeto está sendo desenvolvido com foco em:

* estudo de arquitetura backend
* autenticação com JWT
* modelagem relacional
* boas práticas com NestJS
* organização modular
* regras de negócio reais

---

## 🚀 Tecnologias

* [NestJS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/)
* [MySQL](https://www.mysql.com/)
* [JWT](https://jwt.io/) — autenticação
* [bcrypt](https://www.npmjs.com/package/bcrypt) — criptografia de senhas
* [class-validator](https://github.com/typestack/class-validator) — validação de DTOs
* [@nestjs/config](https://docs.nestjs.com/techniques/configuration) — variáveis de ambiente

---

## 📦 Módulos

* [ ] **AuthModule** — cadastro e login com JWT
* [ ] **UsuarioModule** — gerenciamento de conta
* [ ] **SelecaoModule** — catálogo de seleções (seed fixo)
* [ ] **FigurinhaModule** — catálogo de figurinhas (seed fixo)
* [ ] **ColecaoModule** — marcação de status e estatísticas da coleção

---

## 🗃️ Entidades

### Usuario

| Atributo   | Tipo      | Detalhe                           |
| ---------- | --------- | --------------------------------- |
| id         | uuid      | PK, gerado automaticamente        |
| nome       | varchar   | nome completo do usuário          |
| email      | varchar   | único, usado no login             |
| senha_hash | varchar   | senha criptografada com bcrypt    |
| created_at | timestamp | gerado automaticamente na criação |
| updated_at | timestamp | atualizado automaticamente        |

---

### Selecao

| Atributo     | Tipo    | Detalhe                   |
| ------------ | ------- | ------------------------- |
| id           | int     | PK, auto increment        |
| nome         | varchar | ex: "Brasil", "Argentina" |
| codigo_fifa  | varchar | ex: "BRA", "ARG", "FRA"   |
| bandeira_url | varchar | URL da imagem da bandeira |

---

### Figurinha

| Atributo     | Tipo    | Detalhe                                     |
| ------------ | ------- | ------------------------------------------- |
| id           | int     | PK, auto increment                          |
| selecao_id   | int     | FK → selecoes.id, nullable                  |
| numero       | int     | número oficial do álbum Panini              |
| nome_jogador | varchar | nome completo do jogador                    |
| posicao      | varchar | Goalkeeper, Defender, Midfielder, Forward   |
| especial     | boolean | true para figurinhas especiais              |
| categoria    | varchar | nullable — Golden Baller, Goal Machine, etc |

---

### ColecaoFigurinha

| Atributo     | Tipo | Detalhe                    |
| ------------ | ---- | -------------------------- |
| id           | uuid | PK, gerado automaticamente |
| usuario_id   | uuid | FK → usuarios.id           |
| figurinha_id | int  | FK → figurinhas.id         |
| status       | enum | tenho / falta / repetida   |
| quantidade   | int  | padrão 1                   |

---

## 🔗 Relacionamentos

* Selecao **1:N** Figurinha
* Usuario **1:N** ColecaoFigurinha
* Figurinha **1:N** ColecaoFigurinha

---

## ⚙️ Rodando o projeto

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env

# Rodar em desenvolvimento
npm run start:dev

# Rodar o seed (popula seleções e figurinhas)
npx ts-node src/seed.ts
```

---

## 🌱 Variáveis de ambiente

O projeto utiliza variáveis de ambiente com `@nestjs/config`.

1. Copie o arquivo `.env.example`
2. Renomeie para `.env`
3. Preencha os valores corretamente

### Exemplo do `.env.example`

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
```

---

## 📡 Endpoints

### Auth

| Método | Rota           | Descrição         | Auth |
| ------ | -------------- | ----------------- | ---- |
| POST   | /auth/register | Cadastrar usuário | ❌    |
| POST   | /auth/login    | Fazer login       | ❌    |

---

### Seleções

| Método | Rota                     | Descrição             | Auth |
| ------ | ------------------------ | --------------------- | ---- |
| GET    | /selecoes                | Listar todas          | ❌    |
| GET    | /selecoes/:id            | Buscar uma            | ❌    |
| GET    | /selecoes/:id/figurinhas | Figurinhas da seleção | ❌    |

---

### Figurinhas

| Método | Rota            | Descrição    | Auth |
| ------ | --------------- | ------------ | ---- |
| GET    | /figurinhas     | Listar todas | ❌    |
| GET    | /figurinhas/:id | Buscar uma   | ❌    |

---

### Coleção

| Método | Rota                  | Descrição                 | Auth |
| ------ | --------------------- | ------------------------- | ---- |
| GET    | /colecao              | Álbum completo do usuário | ✅    |
| PATCH  | /colecao/:figurinhaId | Marcar status             | ✅    |
| GET    | /colecao/repetidas    | Listar repetidas          | ✅    |
| GET    | /colecao/stats        | Estatísticas da coleção   | ✅    |

---

## 📋 Regras de negócio

* Status padrão: **falta**
* Quantidade mínima: **1**
* Quando status muda para **tenho** ou **falta**, quantidade volta para **1**
* Se já existe registro de coleção para o usuário + figurinha, atualiza
* Usuário só acessa sua própria coleção
* Email deve ser único
* Senha mínima de 6 caracteres
* JWT expira em 7 dias
* Senha nunca é retornada nos endpoints

---

## 📋 Progresso

* [x] Setup do projeto
* [x] Configuração do TypeORM + MySQL
* [x] Variáveis de ambiente
* [ ] Entidade Usuario
* [ ] AuthModule
* [ ] SelecaoModule
* [ ] FigurinhaModule
* [ ] ColecaoModule
* [ ] Seed das figurinhas
* [ ] Deploy

---

## 📄 Licença

MIT

