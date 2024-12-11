# back-end-digital

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
    git clone https://github.com/Maira-castro/projeto_backEnd.git
    cd Projeto_BackEnd
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:
    ```
    DB_HOST=seu_host_do_banco
    DB_USER=seu_usuario_do_banco
    DB_PASS=sua_senha_do_banco
    DB_NAME=nome_do_banco
    DB_PORT= sua_porta
    KEY_TOKEN=sua_chave_secreta
    ```

4. Inicie o servidor:
    ```bash
    npm run dev
    ```


## Uso

- **Categorias**: Endpoints para criar, ler, atualizar e deletar categorias.
- **Produtos**: Endpoints para criar, ler, atualizar e deletar produtos.
- **Usuários**: Endpoints para gerenciar usuários e autenticação JWT.
- **ImagensProduto**: Endpoitns para gerenciar imagens/produto.
- **opcoesProduto**: Endpointns para gerenciar opcoes/produto.
## Estrutura do Projeto

```plaintext
projeto-backend/
├── src/
│   ├──middleware
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── config/
│   ├── responses.js
│   ├── server.js
│   ├── app.js
├── test/
├── .env
├── .gitignore
├── package.json
└── README.md
