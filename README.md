# Projeto-backend

## Descrição

Este é um projeto backend que implementa um CRUD (Create, Read, Update, Delete) de categorias, produtos e usuários, estabelecendo a conexão entre eles.

## Linguagens de Programação

- Node.js

## Frameworks e Bibliotecas

- Express.js
- Dotenv
- Nodemon
- MySQL
- Sequelize
- JWT
- Jest

## Equipe de Desenvolvimento

- Maira Stefane Nunes Castro

## Objetivo do Projeto

O principal objetivo deste projeto é criar um sistema backend que permita a criação, leitura, atualização e exclusão (CRUD) de categorias, produtos e usuários, além de gerenciar a conexão entre eles.

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
    ```bash
    git clone https://github.com/Maira-castro/back-end-digital.git
    cd project-root
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:
    ```
DB_NAME=sua_db_name
DB_HOST=seu_host
DB_USER=seu_user
DB_PASS=seu_pass
KEY_TOKEN=sua_chave
    ```

4. Inicie o servidor:
    ```bash
    npm run dev
    ```


## Uso

- **Categorias**: Endpoints para criar, ler, atualizar e deletar categorias.
- **Produtos**: Endpoints para criar, ler, atualizar e deletar produtos.
- **Usuários**: Endpoints para gerenciar usuários e autenticação JWT.

## Estrutura do Projeto

```plaintext

├── src/
│   ├──middleware
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── config/
│   ├── server.js
│   ├── app.js
├── test/
├── .env
├── .routes_info.js
├── .gitignore
├── package.json
└── README.md

