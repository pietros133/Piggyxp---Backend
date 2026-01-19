# PiggyXP - Back-End API

**Autor:** Pietro Miranda  

Back-end desenvolvido como parte do **TCC**, responsável por toda a lógica de autenticação, progressão de usuário e regras de negócio de uma aplicação de **educação financeira gamificada**.

O sistema gerencia usuários, autenticação segura, fases, progresso, XP, níveis e recompensas, seguindo boas práticas de arquitetura e separação de responsabilidades.

---

## Objetivo do Projeto

Criar uma API robusta e organizada para servir como base de uma aplicação gamificada que incentiva jovens a aprenderem **educação financeira** por meio de missões, fases e recompensas virtuais.

Este projeto foi pensado não apenas como um trabalho acadêmico, mas como um **projeto de portfólio profissional**, aplicando conceitos reais do mercado.

---

## Tecnologias Utilizadas

- Node.js  
- JavaScript (ES Modules)  
- TypeORM  
- JWT (JSON Web Token)  
- Bcrypt  
- Banco de Dados SQL  
- Dotenv  
- Templates de e-mail em HTML  

---

## Arquitetura do Back-End

A aplicação segue uma arquitetura baseada em **camadas**, garantindo organização, escalabilidade e fácil manutenção.

---

## 1. Estrutura de Pastas

```text
src/
    ├── auth/        → Autenticação (JWT, middlewares, geração de token)
    ├── config/      → Configuração do banco de dados, dotenv, instâncias globais
    ├── controllers/ → Recebem as requisições e chamam os services
    ├── models/      → Modelos do banco (Prisma / Sequelize / Mongoose)
    ├── routes/      → Arquivos de rotas (endpoints → controllers)
    ├── services/    → Regras de negócio (sem req/res)
    └── migrations/  → Alterações do banco de dados versionadas
    └── middlewares/ → funções que interceptam requisições HTTP para validação,controle de fluxo etc...
└──email-templates/  → pasta onde estão armazenados os padrões de e-mails da aplicação

```

---

## 2. Fluxo de Funcionamento do Back-End

Fluxo padrão da aplicação:

```text
Rota → Middleware(s) → Controller → Service → Model → Service → Controller → Response
```

### Responsabilidades

- **Rota:** define qual URL chama qual controller
- **Controller:** recebe a requisição, valida o básico e chama o service
- **Service:** executa a lógica da aplicação
- **Model:** acessa e modifica o banco de dados
- **Middlewares:** intercepta requisições antes do controller.

O service retorna o resultado ao controller, que envia a resposta final ao usuário.

---

## 3. Regras Gerais do Projeto

### Boas práticas

- Controllers devem ser leves (sem lógica pesada)
- Toda a regra de negócio fica nos services
- Models são exclusivos para acesso ao banco
- Evitar duplicação de código (usar `middlewares/`)
- Sempre utilizar `try/catch` para tratamento de erros

---

### Uso de branches

- Nunca fazer commits diretamente na `main`
- Desenvolver na branch `dev` (ou equivalente)
- Testar tudo antes de fazer merge
- Após estabilidade, fazer merge da `dev` para `main`

---

### Padrão de organização

- Nomear arquivos e funções de forma clara
- Manter consistência de nomes e pastas
- Não alterar arquivos de `config/` sem avisar a equipe
- Criar commits pequenos e explicativos

---

## 4. Como subir uma alteração

1. Trocar para a branch correta:

```bash
git checkout nomeBranch
```

2. Atualizar a branch:

```bash
git pull origin nomeBranch
```

3. Adicionar arquivos:

```bash
git add .
```

Ou arquivo específico:

```bash
git add nomeArquivo
```

4. Criar commit:

```bash
git commit -m "descrição do que foi alterado"
```

5. Enviar para o repositório:

```bash
git push origin nomeBranch
```

---

## 5. Migrations

### 5.1 Gerar migration automaticamente

```bash
npx typeorm migration:generate -d src/config/dbconnect.js src/migrations/CreateUserTable
```

> O parâmetro `-d` indica o caminho do arquivo `dbconnect.js`.

---

### 5.2 Executar migrations

```bash
npx typeorm migration:run
```

---

### 5.3 Reverter última migration

```bash
npx typeorm migration:revert
```

### Agradecimentos

Agradeço a todos por participarem da realização deste projeto e por seguirem rigorosamente as regras estabelecidas.
---
### © 2026 Piggyxp by vss
