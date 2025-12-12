### Documentação do Back-End

.Autor: Pietro Miranda

### 1. Estrutura de Pastas

src/
├── auth/ → Lida com autenticação (JWT, middlewares de login, geração de token)
├── config/ → Configuração do banco de dados, dotenv, instâncias globais
├── controllers/ → Recebem as requisições e chamam os services
├── models/ → Modelos do banco (ex: Prisma/Sequelize/Mongoose)
├── routes/ → Arquivos de rotas, mapeando endpoints -> controllers
├── services/ → Regras de negócio e processamento (não mexem com req/res)
└── utils/ → Funções auxiliares (upload, validação, scripts, etc.)
└── migrations/ → arquivo que registra alterações no banco de dados de forma versionada.

### 2. Fluxo de Funcionamento do Back-End

Sempre siga essa ordem:

Rota → Controller → Service → Model → Service → Controller → Resposta

Rota: define qual URL chama qual controller.

Controller: recebe os dados da requisição, valida o básico e chama o service.

Service: executa a lógica da aplicação e conversa com o model.

Model: acessa e modifica o banco de dados.

O Service devolve o resultado para o Controller, que envia a resposta final para o usuário.

### 3. Regras Gerais do Projeto

Para manter o back-end organizado e evitar conflitos, siga estas diretrizes:

####

Manter boas práticas:

.Controllers leves: sem lógica pesada; só recebem requisição, validam o básico e chamam o service.

.Services com toda a lógica de negócio: qualquer regra, processamento ou decisão fica aqui.

.Models exclusivos para acesso ao banco: nada de acessar o banco fora deles.

.Evitar duplicar código: funções repetidas ou utilitárias vão para utils/.

.Sempre usar try/catch: tratar erros para evitar travamentos e facilitar debug.

###

Usar a branch de desenvolvimento:

.Nunca fazer commits diretamente na main.

.Fazer alterações na branch dev (ou nome equivalente).

.Testar tudo na branch de desenvolvimento antes de enviar para a main.

.Quando estiver estável, fazer merge da dev para a main.

###

Padrão de organização:

.Nomear arquivos e funções de forma clara.

.Manter consistência de pastas e nomes.

.Não alterar arquivos de config/ sem avisar a equipe.

.Criar commits pequenos e explicativos.

### 4. Como subir uma alteração (passo a passo)

1. Garantir que está na branch certa:

-> git checkout nomeBranch

2. Puxar as ùltimas atualizações:

-> git pull origin nomeBranch

3. Adicionar os arquivos modificados:

-> git add .

OBS:
-> Caso queira adicionar um arquivo especifico -> git add nomeArquivo

4. Criar um commit com uma mensagem clara:

-> git commit -m "descrição do que foi alterado"

5. Enviar alteração pro repositório:

-> git push origin nomeBranch

## 5. Como criar migrations

### 5.1 Gerar uma migration automaticamente

Use o comando abaixo. Ele cria uma migration já preenchida com base nas entidades do projeto:

```bash
npx typeorm migration:generate -d src/config/dbconnect.js src/migrations/CreateUserTable
```

Obs.: o -d indica o caminho do arquivo dbconnect.js.

### 5.2 Aplicar (executar) as migrations no banco de dados

```bash
npx typeorm migration:run

```

### 5.3 Desfazer a última migration executada

```bash
npx typeorm migration:revert

```
