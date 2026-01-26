# Documentação do Back-End

**Autor:** Pietro Miranda

---
### Documentação da API (Swagger)

A documentação completa das rotas da API está disponível via Swagger:

working ◌👩🏻‍💻

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
