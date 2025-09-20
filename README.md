# API de Pedidos

## Como rodar

### Opção 1: Docker (Recomendado)

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DB_HOST=postgres
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=ordersdb
```

2. Execute o comando:

```bash
docker-compose up -d --build
```

### Opção 2: Desenvolvimento local

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=ordersdb
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto:

```bash
npm run start:dev
```

## Testes

```bash
# Testes unitários
npm run test
```

## Acesso

- **API**: http://localhost:3004
- **Swagger**: http://localhost:3004/api

## Endpoints

- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login
- `GET /orders` - Listar pedidos
- `POST /orders` - Criar pedido